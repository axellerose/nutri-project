const express = require('express');
const router  = express.Router();

const {signup, login, getProfile} = require('../controllers/auth.controller')

router.get('/signup', signup);

router.get('/login', login);

router.get('/profile', getProfile);

module.exports = router;
