const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
   name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true
  },
   description: {
    type: String,
    required: [true, 'Description is required.']
   },
   image: {
    type: String
   },
   info: {
     calories: {
       type: Number,
       required: [true, 'Number of calories is required.']
     },
     fat: {
      type: Number,
      required: [true, 'Fat is required.']
    },
     carbs: {
      type: Number,
      required: [true, 'Carbs is required.']
    },
     proteins: {
      type: Number,
      required: [true, 'Proteins is required.']
    }
   },
   seasons: {
     type: [String],
     required: [true, 'Season(s) is required.']
   },
   category: {
     type: String,
     enum: ['Vegetable','Fruit','Fish','Meat','Seafood','Other']
   }
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', productSchema);
