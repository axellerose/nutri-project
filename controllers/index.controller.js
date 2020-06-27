const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product.model');
const Recipe = require('../models/Recipe.model');
const User = require('../models/User.model');

const getIndex = (req, res, next) => {
  const user = req.session.currentUser
  res.render('index', {user});
}

const getSearch = (req, res) => {
  let query = new RegExp(req.query.name, 'i')
  Product.find({name: query})
  .then(products => {
    Recipe.find({name: query})
    .then(recipes => {
      res.render("search", {products: products, recipes: recipes, query: req.query.name})
    })
    .catch(error => `Error while searching recipes: ${error}`)
  })
  .catch(error => `Error while searching products: ${error}`)
}

module.exports = {
  getIndex,
  getSearch
};