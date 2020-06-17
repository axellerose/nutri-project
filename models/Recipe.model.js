const { Schema, model } = require('mongoose');
const Product = require('../models/Product.model')

const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    image: {
      type: String,
      required: true,
      // default
    },
    rate: Number,
    time: {
      type: Number,
      required: true
    },
    info: {},
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    steps: {
      type: String,
      required: true
    },
    reviews: [String]
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
