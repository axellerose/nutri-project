const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const saltRound = 10;

const getSignup = (req, res, next) => {
  res.render('auth/signup');
}

const postSignup = (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(500).render('auth/signup', { 
      errorMessage: 'Please fill all the fields.'   
    });
    return;
  }
  
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render('auth/signup', { 
      errorMessage: 'The password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter.' 
    });
    return;
  }

  bcrypt.genSalt(saltRound)
  .then(salt => bcrypt.hash(password,salt))
  .then(hashedPassword => {
    User.create({
      username: username,
      email: email,
      password: hashedPassword
    })
    .then(user => {
      req.session.currentUser = user;
      res.redirect('/profile')
    })
    .catch(error => {
      // Email error
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('auth/signup', {
            errorMessage: error.message
        })
      // User already exists
      } else if (error.code === 11000) {
        res.status(400).render('auth/signup', {
          errorMessage: "This username already exists"
        })
      } else {
        console.log(error)
      }
    })
  })
  .catch(err => next(err))
}

const getLogin = (req, res, next) => {
  res.render('auth/login');
}

const postLogin = (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.status(500).render('auth/login', { 
      errorMessage: 'Please fill all the fields.'   
    });
    return;
  }
  
  User.findOne({email})
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: "Wrong email" })
        return
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/profile')
      } else {
        res.render('auth/login', { errorMessage: "Wrong password" })
        return
      }
    })
    .catch (err => next(err))
}

const postLogout = (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy();
    res.redirect('/');
  }
  res.redirect('/');
}

const getProfile = (req, res, next) => {
  const user = req.session.currentUser
  res.render('users/profile', {user});
}

const getSuperProfile = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    res.render('users/super-profile', {user});
  } else {
    res.render('not-found')
  }
}

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  postLogout,
  getProfile,
  getSuperProfile
};