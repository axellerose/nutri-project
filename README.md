# Nutri-Project (ver nombre)
# Developers: 
Alex Gerasymenko & Antoine Rolland
# Link to App: 
<<<Link>>>

## Description

An app that allows to consult recipes and products (see nutritional info), and also to create recipes with the
products in the DB. 
 
## User Stories - MVP

-  As visitor of the page I want to see all the recipes and products
-  As vistor I want to make a Signup (with validations !)
-  As a visitor I want to make a login
-  As user I want to create my own recipes using a library of products
-  As user I want to manage my recipes (edit, delete, create new)

## Backlog

List of other features outside of the MVPs scope

- As a user I want a reponsive app (Mobile first !)
- Have a search tool
- Calculate callories and other nutritions
- Have a detailed view of a product and recipe
- Have suggested recipes on a product page
- Have user-friendly pages to indicate errors of my browser or server

- Have an administrator for editing and deleting recipes

- I want to evaluate a recipe
- I want to write a review
- I want to use multiple selection search (suggestion of recipes with multiple ingredients)
- I want tor restore my password if I forget it

- Maybe I want to choose products for a new recipe using a visual tool (gallery)

- Very optional : I want to share my DB via an API


## ROUTES:

/
/recipes
/recipes/:id
/recipes/:id/edit
/recipes/:id/delete
/products
/products/:id
/products/:id/edit
/products/:id/delete
/products/search?key=value&key2=value2
/profile
/signup
/login
/add-new

|Method|URL|Description|
|---|---|---|
GET | /auth/login | redirects to / if user logged in. Renders auth/login
POST | /auth/login | redirects to / if user logged in

body:
   - username
   - password

GET | /auth/signup| redirects to / if user logged in. Renders auth/signup

body:
   - username
   - password
GET | / | renders the homepage. if the user is not logged in, render access. 
GET | /event/id | renders event-detail
POST | /event/id | update event. redirect /event-detail
body:
   - username
   - event id
   - image
GET | /escape-room-list | renders escape-room-list
POST | /logout | redirects to /
GET | /escape-room-detail | renders escape-room-detail
POST | /escape-room/id | 
body:
   - username
   - escape-room
   - date
   - reserved time
   - escape-room id

## Models

User model
- username: String - unique
- email: String
- password: String
- image: String
- favorites: Array (rel Recipe model)
- myRecipes: Array 
```
```
Product model
- name: String
- description: String
- info: {
   calories: Number,
   proteins: Number,
   carbons: Number,
   fat: Number
   }
- temporada: [String]
```
```
Recipe model
- name: String,
- author: String, rel User model,
- info: {
   calories: Number,
   proteins: Number,
   carbons: Number,
   fat: Number
   }
- time: Number,
- products: Array (rel Product model),
- reviews: [""],
- rank: Math.floor([Number]/[...Number].length)
```
```
## Links
<a href="https://trello.com/b/B7PI9P6H/recipe-project"> Trello </a>

### Git
The url to your repository and to your deployed project
<a href="https://github.com/axellerose/nutri-project"> GitHub </a>
[Deploy Link]
### Slides
The url to your presentation slides
[Slides Link](http://slides.com)
```
