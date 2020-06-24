const { Schema, model } = require('mongoose');
const Recipe = require('../models/Recipe.model');
const Product = require('../models/Product.model');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Incorrect email.'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Password is required']
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: 'Recipe'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);
