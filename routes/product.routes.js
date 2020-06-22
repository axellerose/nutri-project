const express = require('express');
const router  = express.Router();

const {getProducts,getFeed,postFeed,getProductDetails,getDeleteProduct} = require('../controllers/product.controller')

router
.get('/', getProducts)
.get('/feedDb', getFeed)
.post('/feedDb', postFeed)
.get('/details/:name', getProductDetails)
.get('/delete/:name', getDeleteProduct)

module.exports = router;