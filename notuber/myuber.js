var map;
var user;
var userMarker;
var userLat;
var userLng;
var infowindow = new google.maps.InfoWindow();
var request = new XMLHttpRequest();
var jsonResponse;

function getUserLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = position.coords.latitude;
		userLng = position.coords.longitude;
                request.open("POST", "iXay9qIa", true);
                request.send()
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				jsonResponse = JSON.parse(request.responseText);
				user = new google.maps.LatLng(userLat, userLng);
				initMap(jsonResponse);
			}
		};
	});
}



function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 16
        });



        var features = [
        {
                position: new google.maps.LatLng(42.3453, -71.0464)
        },
        {
                position: new google.maps.LatLng(42.3662, -71.0621)
        },
        {
                position: new google.maps.LatLng(42.3603, -71.0547)
        },
        {
                position: new google.maps.LatLng(42.3472, -71.0802)
        },
        {
                position: new google.maps.LatLng(42.3663, -71.0544)
        },
        {
                position: new google.maps.LatLng(42.3542, -71.0704)
        }
        ];

        for (var i = 0; i < features.length; i++) {
          var marker = new google.maps.Marker({
            position: features[i].position,
            icon: 'car.png',
            map: map
          });
          marker.setMap(map);
          };

}
