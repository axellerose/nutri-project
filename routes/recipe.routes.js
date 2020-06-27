const express = require('express');
const router  = express.Router();
const fileUploader = require('../configs/cloudinary.config');

const {
  getRecipes,
  getCreateRecipe,
  postCreateRecipe,
  getRecipeDetails,
  getDeleteRecipe,
  getEditRecipe,
  postEditRecipe,
  postAddFavorites,
  postDeleteFavorites
} = require('../controllers/recipe.controller')

router
.get('/', getRecipes)
.get('/create', getCreateRecipe)
.post('/create', fileUploader.single('image'), postCreateRecipe)
.get('/details/:recipeId', getRecipeDetails)
.get('/delete/:recipeId', getDeleteRecipe)
.get('/edit/:recipeId', getEditRecipe)
.post('/edit/:recipeId', fileUploader.single('image'), postEditRecipe)
.post('/addFavorite', postAddFavorites)
.post('/deleteFavorite', postDeleteFavorites)

module.exports = router;