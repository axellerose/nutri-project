const mongoose = require('mongoose');

const Product = require('../models/Product.model');

const DB_TITLE = 'nutriDb';

mongoose.connect(`mongodb://localhost/${DB_TITLE}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

Product.collection.drop();

const products = [{
  "_id": "5ee8949aedc185295204cea1",
  "seasons": [
    "Spring",
    "Summer"
  ],
  "name": "Banana",
  "description": "A yellow fruit",
  "image": "https://cdn.pixabay.com/photo/2018/01/29/22/56/bananas-3117509_1280.jpg",
  "info": {
    "calories": 72.3,
    "fat": 0.25,
    "carbs": 15.2,
    "proteins": 0.98
  },
  "createdAt": {
    "$date": "2020-06-16T09:44:58.166Z"
  },
  "createdAt": "2020-06-16T09:44:58.166Z",
  "updatedAt": "2020-06-16T09:44:58.166Z"
}]

Product.create(products)
.then(products => console.log("Products created !"))
.catch(err => console.log(err))