# NutriApp

# Developers: 
Alex Gerasymenko & Antoine Rolland

# Link to App: 
[NutriApp](http://nutriapp-project.herokuapp.com/)

## Description

An app that allows to consult products and recipes, and also to create recipes with the
products in the DB. This app show the nutritional infos of each product, but also of each recipe, 
calculating them automatically.
 
## User Stories - MVP

-  As visitor of the page I want to see all the recipes and products
-  As vistor I want to make a Signup (with validations)
-  As a visitor I want to make a login (with validations)
-  As user I want to create my own recipes using a library of products
-  As user I want to manage my recipes (edit, delete, create new)

## Backlog

List of other features outside of the MVPs scope

- As a user I want a reponsive app (Mobile first !)
- As a user I want to have a global search tool
- As a user I also want a local search tool 
(one to search products inside the products section, one to search recipes inside the recipes section)
- As a user I want to see see the calories and other nutrition infos
- As a user I want to see see the calories and other nutrition infos
- As a user I want these calories & nutrition facts to be automatically calculated for 100g of each recipe
- Have an 'superuser' profile for editing and deleting recipes
- As a user, I want a profile page
- As a user, I want to see the recipes I created, somewhere in my profile
- As a user, I want to be able to add "favorites" recipes
- As a user I want to write a review
- As a user I want to evaluate a recipe
- As a user, when I'm creating a recipe, I want to write the instructions 
step by step, and I want the "ordered list" style to be automatically rendered by 
the app.

If more time :
- Have suggested recipes on a product page
- Have user-friendly pages to indicate errors of my browser or server
- I want tor restore my password if I forget it
- I want to share my DB via an API

## ROUTES:

/
/search
/recipes
   /recipes/create
   /recipes/details/:id
   /recipes/edit/:id
   /recipes/delete/:id
   /recipes/addFavorite
   /recipes/deleteFavorite
   /recipes/leaveReview
   /recipes/leaveRating
/products
/products/details/:id
/profile
/profile/my-recipes
/profile/favorite-recipes
/signup
/login
/logout
/add-new

|Method|URL|Description|
|---|---|---|
GET | / | renders homepage
GET | /search | renders global search results page
GET | /auth/signup| renders signup form
POST | /auth/signup| renders signup form if error - redirects to user profile if correct
GET | /auth/login | renders login form
POST | /auth/login | renders login form if error - redirects to user profile if correct
POST | /auth/logout | redirects to homepage
GET | /profile | renders user profile
GET | /profile/my-recipes | renders user's own recipes
GET | /profile/favorite-recipes | renders user's favorite recipes
GET | /products | renders products list
GET | /products/feedDb | !superuser only! renders form to manage the products collection
POST | /productsfeedDb | !superuser only! redirects to products list
GET | /products/edit/:name | !superuser only! renders form to edit a product
POST | /products/edit/:name | !superuser only! redirects to products index
GET | /products/delete/:name | !superuser only! delete a product
GET | /products/details/:name | renders single product details page
GET | /recipes | renders recipes list
GET | /recipes/create | renders recipe creation form
POST | /recipes/create | renders recipe creation form if error - redirects to recipes list
GET | /recipes/details/:recipeId | renders single recipe details page
GET | /recipes/delete/:recipeId | redirects to recipes index
GET | /recipes/edit/:recipeId | renders form to edit a recipe
POST | /recipes/edit/:recipeId | redirects to recipes index
POST | /recipes/addFavorite | refreshes the actual recipe/details/:recipeId page
POST | /recipes/deleteFavorite | refreshes the actual recipe/details/:recipeId page
POST | /recipes/leaveReview | refreshes the actual recipe/details/:recipeId page
POST | /recipes/leaveRating | refreshes the actual recipe/details/:recipeId page

## Models

User model
- username: String - unique
- email: String
- password: String - encrypted
- favorites: [ObjectId] - (ref Recipe model)
- timestamps

Product model
- name: String
- description: String
- image: String
- info: {
   calories: Number,
   proteins: Number,
   carbons: Number,
   fat: Number
   }
- seasons: [String]
- category: [String]
- timestamps

Recipe model
- name: String,
- author: String
- image: String
- ratings: [
   {
      author: String,
      rating: Number
   }
]
- time: Number
- info: {
   calories: Number,
   proteins: Number,
   carbons: Number,
   fat: Number
   }
- products: [
   {
      quantity: Number,
      product: ObjectId - (ref Product model)   
   }
]
- steps: [String]
- reviews: {
   author: String,
   review: String
}
- timestamps

## Links

### Project Kanban
[Trello](https://trello.com/b/B7PI9P6H/recipe-project)

### Git repository
[Github](https://github.com/axellerose/utri-project)

### Deploy
[Heroku App](http://nutriapp-project.herokuapp.com/)

### Slides
[Presentation slides](http://slides.com)