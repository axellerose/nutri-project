const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
   etc: "etc"
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', productSchema);
