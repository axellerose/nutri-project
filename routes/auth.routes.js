const express = require('express');
const router  = express.Router();

const {signup, login, getProfile} = require('../controllers/auth.controller')

router
.get('/signup', signup)
.get('/login', login)
.get('/profile', getProfile)

module.exports = router;
