console.log('ready to server!')

var myLatLng = {lat: 34.0484675, lng: -118.2402491};

$.fn.select2.defaults.set("theme", "classic");
$("#yelpAuto").select2({
  ajax: {
    url: "/yelp/search",
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        q: params.term, // search term
        page: params.page
      };
    },
    processResults: function (data) {
            // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to
            // alter the remote JSON data
            return {
                results: data
            };
    },
    cache: true
  },
  placeholder: "Search for a restaurant",
  templateResult: formatState
});

function overEve (evt){
  console.log($(evt).attr("data-this"));
}

function formatState (business) {
  if (!business.img_url) {return $(`<span><img src="/images/loadings/progress-loading.gif" class="img-flag" />${business.text}</span>`)}
  var $business = $(
    `<span data-this="${business.id}" class="restaurant_hov" onmouseover="overEve(this)"><img src="${business.img_url}" class="img-flag" />${business.text}</span>`
  );
  return $business;
};


$("#yelpAuto").on("change",function(event) {
  console.log($(this).val());
  $.ajax({
    url: '/yelp/business',
    dataType: 'json',
    data: {id: $(this).val()}
  })
  .done(function(data) {
    console.log("success");
    // $("#select_img").attr("src", data.image_url);
    $("#select_heading").text(data.name);
    $("#select_address").text(`${data.location.address1}, ${data.location.city}, ${data.location.state}${data.location.zip_code}`);
    switch (data.rating) {
    case 1:
        $(".select_rating_1").attr("src", '/images/review_stars/iOS/10X10_1@3x.png');
        break;
    case 1.5:
        $(".select_rating_1").attr("src", '/images/review_stars/iOS/10X10_1@3x.png');
        $(".select_rating_2").attr("src", '/images/review_stars/iOS/10X10_1-5@3x.png');
        $(".select_rating_3, .select_rating_4, .select_rating_5").attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 2:
        $(".select_rating_1, .select_rating_2").attr("src", '/images/review_stars/iOS/10X10_2@3x.png');
        break;
    case 2.5:
        $(".select_rating_1, .select_rating_2").attr("src", '/images/review_stars/iOS/10X10_2@3x.png');
        $(".select_rating_3").attr("src", '/images/review_stars/iOS/10X10_2-5@3x.png');
        $(".select_rating_4, .select_rating_5").attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 3:
        $(".select_rating_1, .select_rating_2, .select_rating_3").attr("src", '/images/review_stars/iOS/10X10_3@3x.png');
        break;
    case 3.5:
        $(".select_rating_1, .select_rating_2, .select_rating_3").attr("src", '/images/review_stars/iOS/10X10_3@3x.png');
        $(".select_rating_4").attr("src", '/images/review_stars/iOS/10X10_3-5@3x.png');
        $(".select_rating_5").attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 4:
        $(".select_rating_1, .select_rating_2, .select_rating_3, .select_rating_4").attr("src", '/images/review_stars/iOS/10X10_4@3x.png');
        $(".select_rating_5").attr("src", '/images/review_stars/iOS/10X10_0@3x.png');
        break;
    case 4.5:
        $(".select_rating_1, .select_rating_2, .select_rating_3, .select_rating_4").attr("src", '/images/review_stars/iOS/10X10_4@3x.png');
        $(".select_rating_5").attr("src", '/images/review_stars/iOS/10X10_4-5@3x.png');
        break;
    case 5:
        $(".select_rating_1, .select_rating_2, .select_rating_3, .select_rating_4, .select_rating_5").attr("src", '/images/review_stars/iOS/10X10_5@3x.png');
    }
    $("#select_price").text(data.price);
    $("#select_photo_1").attr("src", data.photos[0]);
    $("#select_photo_2").attr("src", data.photos[1]);
    $("#select_photo_3").attr("src", data.photos[2]);
    $("#select_review").text(`${data.review_count} Reviews`).closest('a').attr("href", data.url);

  })
});


function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
     position: myLatLng,
     map: map,
     title: 'Hello World!'
  });

  $("#yelpAuto").on("change",function(event) {
    $.ajax({
      url: '/yelp/business',
      dataType: 'json',
      data: {id: $(this).val()}
    })
    .done(function(data) {
      myLatLng = {lat: data.coordinates.latitude, lng: data.coordinates.longitude};
      marker.setPosition(myLatLng);
      map.setCenter(myLatLng);
    });
  });

}
