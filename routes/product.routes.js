const express = require('express');
const router  = express.Router();
const fileUploader = require('../configs/cloudinary.config');

const {
  getProducts,
  getFeed,
  postFeed,
  getEditProduct,
  postEditProduct,
  getProductDetails,
  getDeleteProduct
} = require('../controllers/product.controller')

router
.get('/', getProducts)
.get('/feedDb', getFeed)
.post('/feedDb', fileUploader.single('image'), postFeed)
.get('/edit/:name', getEditProduct)
.post('/edit/', fileUploader.single('image'), postEditProduct)
.get('/details/:name', getProductDetails)
.get('/delete/:name', getDeleteProduct)

module.exports = router;