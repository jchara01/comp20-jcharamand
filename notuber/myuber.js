var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 8
        });
      }

src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" ;
async defer;
