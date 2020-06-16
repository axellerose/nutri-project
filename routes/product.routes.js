const express = require('express');
const router  = express.Router();

const {products,getFeed,postFeed} = require('../controllers/product.controller')

router
.get('/', products)
.get('/feedDb', getFeed)
.post('/feedDb', postFeed)

module.exports = router;
