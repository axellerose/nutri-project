const express = require('express');
const router  = express.Router();

const {getProducts,getFeed,postFeed,getProductDetails} = require('../controllers/product.controller')

router
.get('/', getProducts)
.get('/feedDb', getFeed)
.post('/feedDb', postFeed)
.get('/details/:name', getProductDetails)

// http://localhost:3000/products/product-details/Kiwi

module.exports = router;