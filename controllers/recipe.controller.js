const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const recipes = (req, res, next) => {
  res.render('recipes/index');
}

module.exports = {
  recipes
};