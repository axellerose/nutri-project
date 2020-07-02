const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product.model");
const Recipe = require("../models/Recipe.model");

const getProducts = (req, res, next) => {
  const user = req.session.currentUser;
  Product.find()
    .then((products) => {
      res.render("products/index", { user, products });
    })
    .catch((err) => console.log(err));
};

const getFeed = (req, res, next) => {
  const user = req.session.currentUser;
  if (user && user.isSuperuser) {
    res.render("products/feed-products-db", { user });
  } else {
    res.redirect("/products");
  }
};

const postFeed = (req, res, next) => {
  const user = req.session.currentUser;
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    image: req.file.path,
    info: {
      calories: req.body.calories,
      fat: req.body.fat,
      carbs: req.body.carbs,
      proteins: req.body.proteins,
    },
    seasons: req.body.seasons,
  };
  Product.create(newProduct)
    .then((product) => {
      res.redirect("/products");
      console.log(`Product added: ${product}`);
    })
    .catch((error) => {
      res.render("products/feed-products-db", { error: error, user: user });
      console.log(`Error : ${error}`);
    });
  res.render("products/feed-products-db");
};

const getEditProduct = (req, res, next) => {
  const user = req.session.currentUser;
  Product.findOne({ name: req.params.name })
    .then((product) => {
      if (user && user.isSuperuser) {
        res.render("products/product-edit", { product });
      } else {
        res.redirect("/products");
      }
    })
    .catch((err) => {
      console.log("ERROR ACCESSING TO EDIT PRODUCT: ", err);
    });
};

const postEditProduct = (req, res, next) => {
  const user = req.session.currentUser;
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    info: {
      calories: req.body.calories,
      fat: req.body.fat,
      carbs: req.body.carbs,
      proteins: req.body.proteins,
    },
  };
  if (req.file) {
    newProduct.image = req.file.path;
  } else {
    newProduct.image = req.body.existingImage;
  }
  if (req.body.seasons) {
    newProduct.seasons = req.body.seasons;
  } else {
    newProduct.seasons = req.body.existingSeasons;
  }
  console.log(req.body);
  Product.findByIdAndUpdate(req.body.id, newProduct, { runValidators: true })
    .then((product) => {
      console.log(product);
      res.redirect("/products/");
    })
    .catch((error) => {
      res.render("products/feed-products-db", { error: error, user: user });
      console.log(`Error when editing product: ${error}`);
    });
};

const getProductDetails = (req, res, next) => {
  const user = req.session.currentUser;
  Product.findOne({ name: req.params.name })
    .then((product) => {
      Recipe.find({ "products.product": product._id })
        .then((recipes) => {
          res.render("products/product-details", {
            user: user,
            product: product,
            relatedRecipes: recipes,
          });
        })
        .catch((err) =>
          console.log(
            `Error creating relation products-recipes on Product's page: ${err}`
          )
        );
    })
    .catch((err) => {
      console.log(`Error getting product details: ${err}`);
      res.redirect("/products");
    });
};

const getDeleteProduct = (req, res, next) => {
  const user = req.session.currentUser;
  if (user && user.isSuperuser) {
    Product.findOneAndDelete({ name: req.params.name })
      .then(() => {
        res.redirect("/products");
        console.log("Product deleted!");
      })
      .catch((err) => console.log("Error while deleting product" + err));
  } else {
    res.redirect("/products");
  }
};

module.exports = {
  getProducts,
  getFeed,
  postFeed,
  getEditProduct,
  postEditProduct,
  getProductDetails,
  getDeleteProduct,
};
