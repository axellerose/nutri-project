const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Product = require('../models/Product.model')
const Recipe = require('../models/Recipe.model')


const recipes = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.find()
  .then(recipes => {
    res.render('recipes/index', {user, recipes});
  })
  .catch(err => console.log(`Error : ${err}`))
}

const getCreateRecipe = (req, res, next) => {
  const user = req.session.currentUser
  Product.find()
  .then(products => {
    res.render('recipes/create-recipe', {user, products});
  })
  .catch(err => console.log(`Error : ${err}`))
}

const postCreateRecipe = (req, res, next) => {
  const user = req.session.currentUser
  console.log(req.body)
  const newRecipe = {
    name: req.body.name,
    image: req.body.image,
    time: req.body.time,
    products: [],
    steps: req.body.steps,
  }
  
  req.body.productIds.forEach((elem,idx) => newRecipe.products.push({product: elem,quantity: req.body.quantities[idx]}))
  console.log(newRecipe)
  Recipe.create(newRecipe)
  .then(recipe => {
    console.log("New recipe created : ", recipe)
    res.redirect('/recipes')
  })
  .catch(err => console.log(`Error : ${err}`))
}

const getRecipeDetails = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findOne({name: req.params.name})
  .populate('products.product')
  .then(recipe => {
    res.render('recipes/recipe-details', {user: user, recipe: recipe});
  })
  .catch(err => {
    console.log(`Error getting product details: ${err}`)
    res.redirect('/recipes');
  })
}

module.exports = {
  recipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails
};