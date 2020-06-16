const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const products = (req, res, next) => {
  const user = req.session.currentUser
  res.render('products/index', {user});
}

module.exports = {
  products
};