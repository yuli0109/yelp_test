var Yelp = require('yelp-api-v3');

var yelp = new Yelp({
  app_id: `yklCNU9gShiTSYioODa52g`,
  app_secret: `lrPtYmQDiEiIbSevqcNW8C5XLzJ2ABqGQCL1Iu5svYltMKJEjmTawad3yhlkmLZV`
});

function search (req, res, next) {
  yelp.search({term: `${req.query.q}`, location: '90012', limit: 10}, function(err, data) {
      console.log("Below is data");
      var restaurants = JSON.parse(data).businesses;
      var searchResults = restaurants.map(function(el){
        return {text:el.name, id: el.id}
      })
      console.log(JSON.parse(data).businesses);
      console.log(searchResults);
      res.status(200).json(searchResults);
  });
}

module.exports={
  search:search
}
