const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const signup = (req, res, next) => {
  res.render('auth/signup');
}

const login = (req, res, next) => {
  res.render('auth/login');
}

const getProfile = (req, res, next) => {
  res.render('users/profile');
}

module.exports = {
  signup,
  login,
  getProfile
};