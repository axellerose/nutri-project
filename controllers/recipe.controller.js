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
    // Calculate nutrition info field for the recipe : example with the calories :
    // 1 - We sum the total of quantities of all the products for the recipe
    // 2 - We calculate the amount of calories thanks to the info of each product 
    //     ( we need to multiply the calories of each product by the quantity of the product, divided by 100
    //       to get the real quantity for this recipe
    //       ex : 100g of strawberry = 33 calories --> 25g of it = 33*(25/100) = 8.25g in the recipe)
    // 3 - We make a "rule of three" (regla de tres) to know the quantity of calories for 100g of this recipe
    const totalQuantities = recipe.products.reduce((acc, curr) => acc + curr.quantity, 0)
    const totalCalories = recipe.products.reduce((acc, curr) => acc + (curr.product.info.calories * (curr.quantity/100)), 0)
    const totalFat = recipe.products.reduce((acc, curr) => acc + (curr.product.info.fat * (curr.quantity/100)), 0)
    const totalCarbs = recipe.products.reduce((acc, curr) => acc + (curr.product.info.carbs * (curr.quantity/100)), 0)
    const totalProteins = recipe.products.reduce((acc, curr) => acc + (curr.product.info.proteins * (curr.quantity/100)), 0)
    recipe.info.calories = ((totalCalories*100)/totalQuantities).toFixed(2)
    recipe.info.fat = ((totalFat*100)/totalQuantities).toFixed(2)
    recipe.info.carbs = ((totalCarbs*100)/totalQuantities).toFixed(2)
    recipe.info.proteins = ((totalProteins*100)/totalQuantities).toFixed(2)
    res.render('recipes/recipe-details', {user: user, recipe: recipe});
  })
  .catch(err => {
    console.log(`Error getting product details: ${err}`)
    res.redirect('/recipes');
  })
}

const getDeleteRecipe = (req, res, next) => {
  const user = req.session.currentUser
  console.log("REQ RECIPE ID: ", req.params.recipeId)
  Recipe.findByIdAndDelete(req.params.recipeId)
  .then(recipe => {
    res.redirect('/recipes')
    console.log("Recipe deleted: ", recipe)
  })
  .catch(err => {
    console.log("ERROR DELETING RECIPE: ", err)
  })
} 

module.exports = {
  recipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails,
  getDeleteRecipe
};