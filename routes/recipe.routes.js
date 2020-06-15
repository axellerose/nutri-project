const express = require('express');
const router  = express.Router();

const {recipes} = require('../controllers/recipe.controller')

router
.get('/', recipes);

module.exports = router;
