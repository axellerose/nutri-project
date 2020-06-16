const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const index = (req, res, next) => {
  const user = req.session.currentUser
  res.render('index', {user});
}

module.exports = {
  index
};