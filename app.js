require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Set up the database
require('./configs/db.configs');

// Create Session
const createSession = require('./configs/session.config')
createSession(app)

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Set handlebars helpers
require('./configs/handlebarsHelpers.configs');


// default value for title local
app.locals.title = 'NutriApp';


// Routes
const index = require('./routes/index.routes');
const auth = require('./routes/auth.routes');
const profile = require('./routes/profile.routes');
const products = require('./routes/product.routes');
const recipes = require('./routes/recipe.routes');
app.use('/', index);
app.use('/', auth);
app.use('/profile', profile);
app.use('/products', products);
app.use('/recipes', recipes);


module.exports = app;
