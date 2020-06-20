const express = require('express');
const router  = express.Router();

const {recipes,getCreateRecipe,postCreateRecipe,getRecipeDetails,getDeleteRecipe} = require('../controllers/recipe.controller')

router
.get('/', recipes)
.get('/create', getCreateRecipe)
.post('/create', postCreateRecipe)
.get('/details/:name', getRecipeDetails)
.get('/delete/:recipeId', getDeleteRecipe)

module.exports = router;