const hbs = require('hbs');

module.exports = hbs.registerHelper('ifHasAuth', function(v1, v2, v3, options) {
  if(v1 === v2 || v3) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = hbs.registerHelper('ifNotContains', function(v1, v2, options) {
  if(v1.indexOf(v2) === -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});