var express = require('express')
  , request = require('supertest')
  , extractFilters = require('../extractFilters');

var app = express();

app.use(extractFilters.extractFilters);

app.use(function(req, res, next){
  res.end(JSON.stringify(req.happyRest.filters));
});

describe('connect.extractFilters()', function(){
    it('should extract req.query', function(done){
      request(app)
      .get('/test?user=toto')
      .expect('{"user":["toto"]}', done);
    })
 
})
