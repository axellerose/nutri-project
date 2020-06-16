const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Product = require('../models/Product.model');

const products = (req, res, next) => {
  const user = req.session.currentUser
  Product.find()
  .then(products => {
    res.render('products/index', {user,products});
  })
  .catch(err => console.log(err))
}

const getFeed = (req, res, next) => {
  const user = req.session.currentUser
  res.render('products/feed-products-db', {user});
}

const postFeed = (req, res, next) => {
  const user = req.session.currentUser
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    info :{
      calories: req.body.calories,
      fat: req.body.fat,
      carbs: req.body.carbs,
      proteins: req.body.proteins
    },
    seasons: req.body.seasons,
  }
  Product.create(newProduct)
  .then(product => {
      res.redirect('/products');
      console.log(`Product added: ${product}`)
  })
  .catch(error => {
      res.render('products/feed-products-db',{error: error, user: user})
      console.log(`Error : ${error}`)
  })
  res.render('products/feed-products-db');
}

module.exports = {
  products,
  getFeed,
  postFeed
};