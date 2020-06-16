const express = require('express');
const router  = express.Router();

const {products,getFeed,postFeed,getProductDetails} = require('../controllers/product.controller')

router
.get('/', products)
.get('/feedDb', getFeed)
.post('/feedDb', postFeed)
.get('/details/:name', getProductDetails)

// http://localhost:3000/products/product-details/Kiwi

module.exports = router;