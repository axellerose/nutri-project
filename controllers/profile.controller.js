const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Recipe = require('../models/Recipe.model');
// const Product = require('../models/Product.model');
const User = require('../models/User.model');

const getProfile = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  Recipe.find({"author": user.username})
  .then(recipes => {
    res.render('users/profile', {user: user, myRecipes: recipes});
  })
}

const getMyRecipes = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  Recipe.find({"author": user.username})
  .then(recipes => {
    res.render('users/my-recipes', {user: user, myRecipes: recipes});
  })
}

const getMyFavoriteRecipes = (req, res, next) => {
  const user = req.session.currentUser
  if (user && user.username === "superuser") {
    user.isSuperuser = true
  }
  User.findOne({username: user.username})
  // Edit here, doesnt work for the moment
  .populate()
  .then(thisUser => {
    console.log(thisUser)
    res.render('users/my-favorite-recipes', {user: user, favoriteRecipes: thisUser.favorites});
  })
}

module.exports = {
  getProfile,
  getMyRecipes,
  getMyFavoriteRecipes
};