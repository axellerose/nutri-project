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
    time: Number,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    info: {},
    reviews: [String],
    rank: Number
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
