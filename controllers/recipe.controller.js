const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const recipes = (req, res, next) => {
  const user = req.session.currentUser
  res.render('recipes/index', {user});
}

module.exports = {
  recipes
};