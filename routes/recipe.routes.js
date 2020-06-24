const express = require('express');
const router  = express.Router();

const {
  getRecipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails,
  getDeleteRecipe,
  getEditRecipe,
  postEditRecipe,
  postAddFavorites
} = require('../controllers/recipe.controller')

router
.get('/', getRecipes)
.get('/create', getCreateRecipe)
.post('/create', postCreateRecipe)
.get('/details/:recipeId', getRecipeDetails)
.get('/delete/:recipeId', getDeleteRecipe)
.get('/edit/:recipeId', getEditRecipe)
.post('/edit/:recipeId', postEditRecipe)
.post('/addFavorite', postAddFavorites)

module.exports = router;