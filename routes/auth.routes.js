const express = require('express');
const router  = express.Router();

const {getSignup, postSignup, getLogin, postLogin, postLogout, getProfile} = require('../controllers/auth.controller');

router
.get('/signup', getSignup)
.post('/signup', postSignup)
.get('/login', getLogin)
.post('/login', postLogin)
.post('/logout', postLogout)
.get('/profile', getProfile)

module.exports = router;
