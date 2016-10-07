var Yelp = require("yelp-v3");

var yelp = new Yelp({
  access_token: 'uFltF1SyIxq5JYvN5dco6xx0fqkVUvaLXLLIz10HyLrMk1U7q7-rjBjF6ETl44O7wF5UeqfxebO4R5QhYvzv7f9zO_PFfg0yXVL7AglcTnbN4hIM8BF12o0PFHL0V3Yx'
});


module.exports={
  businessFind: businessFind,
  businessSearch: businessSearch
}


function businessFind (req, res, next) {
 yelp.businesses(req.query.id, function(error, data) {
  console.log(data);
  res.status(200).json(data);
 });
}

function businessSearch (req, res, next) {
  yelp.search({term: req.query.q, location: '90012', limit: 10, sort_by: 'rating'}, function(error, data) {
    console.log(data.businesses);
    var searchResults = data.businesses.map(function(el){
        return {text:el.name, id: el.id, img_url: el.image_url}
    })
    console.log(searchResults)
    res.status(200).json(searchResults);
  });
}
