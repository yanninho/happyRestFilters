# happyRestFilters
Express middleware which extract filters from request

# Example : 

	request : /test?user=toto,titi,t*t*
	result : req.happyRest.filters =  {"user" : ["toto","titi","t.*t.*"]}

# install

npm install happyrestfilters

# How to use ?

like all others Express middleware : 

## Application-level : 

var express = require('express')
  , happyRestFilters = require('happyRestFilters');

var app = express();

app.use(extractFilters());

app.use('/test?user=toto', function (req, res, next) {
  console.log('Filters:', req.happyRest.filters);
  next();
});

## Application-level : 

var express = require('express')
  , happyRestFilters = require('happyRestFilters');

var router = express.Router();

router.get('/test?user=toto', extractFilters(), function (req, res, next) {
	  console.log('Filters:', req.happyRest.filters);
	  next();
	})
