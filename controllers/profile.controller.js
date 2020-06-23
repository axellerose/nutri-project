const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Recipe = require('../models/Recipe.model');

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

module.exports = {
  getProfile,
  getMyRecipes
};