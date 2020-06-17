const express = require('express');
const router  = express.Router();

const {recipes,getCreateRecipe,postCreateRecipe,getRecipeDetails} = require('../controllers/recipe.controller')

router
.get('/', recipes)
.get('/create', getCreateRecipe)
.post('/create', postCreateRecipe)
.get('/details/:name', getRecipeDetails);

module.exports = router;
