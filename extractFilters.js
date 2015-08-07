'use strict';
/**
* Extract filters from request
* Example : /test?user=toto,titi give req.happyRest.filters = {"user": ["toto","titi"]}
* it's possible to use regex with *
**/
var _ = require('underscore');

module.exports = function() {
  return function extractFilters(req, res, next) {
    if (!req.happyRest) req.happyRest = {};
    if (req.happyRest.filters) return next();

    req.happyRest.filters = {};

    var filters = req.query;
    
    if (filters) {
		_.mapObject(filters, function(val, key) {
			if (!_.contains(['range', 'fields', 'sort', 'desc'], key)) {
				req.happyRest.filters[key] = _.map(val.split(','), 
					function(item) { 
						if (item.indexOf('*') > -1) {
							return  new RegExp(item.replace('*', '.*'), "i"); 
						}
						else {
							return item;
						}
						
					});
			}
		});
	}
    next();
  };
};
