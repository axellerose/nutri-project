const express = require('express');
const router  = express.Router();
const uploader = require('../configs/cloudinary.config');
const fileUploader = uploader.single('image');

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
.post('/create', fileUploader, postCreateRecipe)
.get('/details/:recipeId', getRecipeDetails)
.get('/delete/:recipeId', getDeleteRecipe)
.get('/edit/:recipeId', getEditRecipe)
.post('/edit/:recipeId', postEditRecipe)
.post('/addFavorite', postAddFavorites)
.post('/deleteFavorite', postDeleteFavorites)

module.exports = router;