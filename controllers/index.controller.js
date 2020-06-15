const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const index = (req, res, next) => {
  res.render('index');
}

module.exports = {
  index
};