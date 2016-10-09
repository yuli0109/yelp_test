var express = require('express');
var router = express.Router();
var YelpFind = require('../controllers/yelp-business.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/yelp/search', YelpFind.businessSearch);

router.get('/yelp/business', YelpFind.businessFind);

router.get('/map', function(req, res, next) {
  res.render('map');
})

module.exports = router;
