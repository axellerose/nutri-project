const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const products = (req, res, next) => {
  res.render('products/index');
}

module.exports = {
  products
};