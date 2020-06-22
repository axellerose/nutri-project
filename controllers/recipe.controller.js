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
  const newRecipe = {
    name: req.body.name,
    author: user.username,
    image: req.body.image,
    time: req.body.time,
    products: [],
    steps: req.body.steps,
  }
  req.body.productIds.forEach((elem,idx) => newRecipe.products.push({product: elem,quantity: req.body.quantities[idx]}))
  Recipe.create(newRecipe)
  .then(recipe => {
    console.log("New recipe created : ", recipe)
    res.redirect('/recipes')
  })
  .catch(err => console.log(`Error : ${err}`))
}

const getRecipeDetails = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findById(req.params.recipeId)
  .populate('products.product')
  .then(recipe => {
    // Calculate nutrition info field for the recipe : example with the calories :
    // 1 - We sum the total of quantities of all the products for the recipe
    // 2 - We calculate the amount of calories thanks to the info of each product 
    //     ( we need to multiply the calories of each product by the quantity of the product, divided by 100
    //       to get the real quantity for this recipe
    //       ex : 100g of strawberry = 33 calories --> 25g of it = 33*(25/100) = 8.25g in the recipe)
    // 3 - We make a "rule of three" (regla de tres) to know the quantity of calories for 100g of this recipe
    
    // REFACTORIZAR EN UNA FUNCTION
    //##############################################################
    //#####################!!!!!!ACHTUNG!!!!!!######################
    //##############################################################
    //##########You should request each product from DB#############
    //#by id contained in each recipe.products Array before .reduce#
    //##############################################################
    //###################!!!!!!END ACHTUNG!!!!!!####################
    //##############################################################

    const calculateProp = (products, prop) => products.reduce((acc, curr) => acc + (curr.product.info[prop] * (curr.quantity/100)), 0)
    const calculateTotal = (prop, quantity) => (prop * 100/ quantity).toFixed(2)
    
    function calculateRecipe(recipe) {
      const totalQty = recipe.products.reduce((acc, curr) => acc + curr.quantity, 0)
      const calories = calculateProp(recipe.products, "calories")
      const proteins = calculateProp(recipe.products, "proteins")
      const fat = calculateProp(recipe.products, "fat")
      const carbs = calculateProp(recipe.products, "carbs")
      return {
        calories: calculateTotal(calories, totalQty),
        fat: calculateTotal(fat, totalQty),
        carbs: calculateTotal(carbs, totalQty),
        proteins: calculateTotal(proteins, totalQty),
      }
    }
    recipe.info = calculateRecipe(recipe) 
    res.render('recipes/recipe-details', {user: user, recipe: recipe});
  })
  .catch(err => {
    console.log(`Error getting product details: ${err}`)
    res.redirect('/recipes');
  })
}

const getDeleteRecipe = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findByIdAndDelete(req.params.recipeId)
  .then(recipe => {
    res.redirect('/recipes')
    console.log("Recipe deleted: ", recipe)
  })
  .catch(err => {
    console.log("ERROR DELETING RECIPE: ", err)
  })
}

const getEditRecipe = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findById(req.params.recipeId)
  .populate('products.product')
  .then(recipe => {
    Product.find()
    .then(products => {
      res.render('recipes/recipe-edit', {recipe, products, user})
    })
  })
  .catch(err => {
    console.log("ERROR ACCESSING TO EDIT FORM: ", err)
  })
}

const postEditRecipe = (req, res, next) => {
  const user = req.session.currentUser
  console.log(req.body)
  const newValues = {
    name: req.body.name,
    image: req.body.image,
    time: req.body.time,
    products: [],
    steps: req.body.steps,
  }
  req.body.productIds.forEach((elem,idx) => {
    newValues.products.push({product: elem,quantity: req.body.quantities[idx]})
  })
  Recipe.findByIdAndUpdate(req.params.recipeId, newValues)
  .then(recipe => {
    console.log("Recipe edited: ", recipe)
    res.redirect('/recipes/details/' + recipe._id)
  })
  .catch(err => {
    console.log("ERROR WHILE EDITING RECIPE: ", err)
  })
}

module.exports = {
  recipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails,
  getDeleteRecipe,
  getEditRecipe,
  postEditRecipe
};