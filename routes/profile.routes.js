const express = require('express');
const router  = express.Router();

const {getProfile, getMyRecipes} = require('../controllers/profile.controller');

router
.get('/', getProfile)
.get('/my-recipes', getMyRecipes)

module.exports = router;
