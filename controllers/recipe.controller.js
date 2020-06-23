const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Product = require('../models/Product.model')
const Recipe = require('../models/Recipe.model')


const getRecipes = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.find()
  .then(recipes => {
    res.render('recipes/index', {user, recipes});
  })
  .catch(err => console.log(`Error : ${err}`))
}

const getCreateRecipe = (req, res, next) => {
  const user = req.session.currentUser
  if (user) {
    Product.find()
    .then(products => {
      res.render('recipes/create-recipe', {user, products});
    })
    .catch(err => console.log(`Error : ${err}`))
  } else {
    res.redirect('/recipes')
  }
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
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      Product.find()
      .then(products => {
        res.status(400).render('recipes/create-recipe', {
          errorMessage: "Please fill all the fields to create a new recipe",
          user: user,
          products: products
      })
      })
    } else {
      console.log(`Error while creating recipe: ${error}`)
    }
  })
}

const getRecipeDetails = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findById(req.params.recipeId)
  .populate('products.product')
  .then(recipe => {
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
  Recipe.findOne({_id: req.params.recipeId})
  .then(recipe => {
    if ((user && user.username === recipe.author) || (user && user.isSuperuser)) {
      Recipe.findByIdAndDelete(req.params.recipeId)
      .then(recipe => {
        res.redirect('/recipes')
        console.log("Recipe deleted: ", recipe)
      })
      .catch(err => {
        console.log("ERROR DELETING RECIPE: ", err)
      })
    } else {
      res.redirect('/recipes')
    }
  })
  .catch(err => next(err))
}

const getEditRecipe = (req, res, next) => {
  const user = req.session.currentUser
  Recipe.findById(req.params.recipeId)
  .populate('products.product')
  .then(recipe => {
    Product.find()
    .then(products => {
      if ((user && user.username === recipe.author) || (user && user.isSuperuser)) {
        res.render('recipes/recipe-edit', {recipe, products, user})
      } else {
        res.redirect('/recipes')
      }
    })
  })
  .catch(err => {
    console.log("ERROR ACCESSING TO EDIT FORM: ", err)
  })
}

const postEditRecipe = (req, res, next) => {
  const user = req.session.currentUser
  const recipeId = req.body.recipeId
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
  Recipe.findByIdAndUpdate(req.params.recipeId, newValues, { runValidators: true })
  .then(recipe => {
    res.redirect('/recipes/details/' + recipe._id)
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      Product.find()
      .then(products => {
        Recipe.findOne({_id: recipeId})
        .populate('products.product')
        .then(recipe => {
          res.status(400).render('recipes/recipe-edit', {
            errorMessage: "Please fill all the fields to edit a recipe",
            user: user,
            products: products,
            recipe: recipe
        })
      })
      })
    } else {
      console.log(`Error while editing recipe: ${error}`)
    }
  })
}

module.exports = {
  getRecipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails,
  getDeleteRecipe,
  getEditRecipe,
  postEditRecipe
};