const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
  {
   etc: "etc"
  },
  {
    timestamps: true
  }
);

module.exports = model('Recipe', recipeSchema);
