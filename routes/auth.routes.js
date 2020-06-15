const express = require('express');
const router  = express.Router();

const {getSignup, postSignup, getLogin, postLogin, getProfile} = require('../controllers/auth.controller')

router
.get('/signup', getSignup)
.post('/signup', postSignup)
.get('/login', getLogin)
.post('/login', postLogin)
.get('/profile', getProfile)

module.exports = router;
