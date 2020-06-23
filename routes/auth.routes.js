const express = require('express');
const router  = express.Router();

const {getSignup, postSignup, getLogin, postLogin, postLogout} = require('../controllers/auth.controller');

router
.get('/signup', getSignup)
.post('/signup', postSignup)
.get('/login', getLogin)
.post('/login', postLogin)
.post('/logout', postLogout)

module.exports = router;
