const { Schema, model } = require('mongoose');
const Product = require('../models/Product.model');

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    author: {
      type: String
    },
    image: {
      type: String,
      required: true
    },
    rate: Number,
    time: {
      type: Number,
      required: true
    },
    info: {
      calories: Number,
      fat: Number,
      carbs: Number,
      proteins: Number
    },
    products: [
      {
      quantity: Number,
      product: 
          {
          type: Schema.Types.ObjectId,
          ref: 'Product'
          }
      }
    ],
    steps: {
      type: [String],
      required: true
    },
    reviews: [String]
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
