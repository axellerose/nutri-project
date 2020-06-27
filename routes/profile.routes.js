const express = require('express');
const router  = express.Router();

const {getProfile, getMyRecipes, getMyFavoriteRecipes} = require('../controllers/profile.controller');

router
.get('/', getProfile)
.get('/my-recipes', getMyRecipes)
.get('/favorite-recipes', getMyFavoriteRecipes)

module.exports = router;
