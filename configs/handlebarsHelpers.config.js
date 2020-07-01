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

module.exports = hbs.registerHelper('ifAndOperator', function(v1, v2, options) {
  if(v1 && v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = hbs.registerHelper('ifNoReview', function(v1, v2, options) {
  let reviewsAuthors = []
  v1.forEach(elem => reviewsAuthors.push(elem.author))
  if (reviewsAuthors.indexOf(v2) === -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = hbs.registerHelper('ifNoRatings', function(v1, v2, options) {
  let ratingsAuthors = []
  v1.forEach(elem => ratingsAuthors.push(elem.author))
  if (ratingsAuthors.indexOf(v2) === -1) {
    return options.fn(this);
  }
  return options.inverse(this);
});

function getRatingsAverage(array) {
  return ((array.reduce((acc, curr) => acc + curr.rating, 0) /array.length))
}

module.exports = hbs.registerHelper('getAverage', function(v1, options) {
  let average = getRatingsAverage(v1).toFixed(1)
  return average
});

module.exports = hbs.registerHelper('getAverageInPercent', function(v1, options) {
  // First, get the average of rating in percentage
  let average = getRatingsAverage(v1)/5*100
  // Then return it as a String, rounded to the nearest ten and with the "%" symbol
  return `${Math.round(average/5)*5+5}%`
});

module.exports = hbs.registerHelper('numberOfVotes', function(v1, options) {
  const totalOfVotes = v1.length
  return  totalOfVotes === 1 ? `${totalOfVotes} vote` : `${totalOfVotes} votes`
});