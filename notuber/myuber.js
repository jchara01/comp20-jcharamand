var map;
var user;
var userMarker;
var userLat;
var userLng;
var infowindow = new google.maps.InfoWindow();
var xhr = new XMLHttpRequest();
var jsonResponse;
var params;

xhr.open("POST", "https://hans-moleman.herokuapp.com/rides", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

function getUserLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = position.coords.latitude;
		userLng = position.coords.longitude;
		params = "username=iXay9qIa&lat=" + userLat + "&lng=" + userLng;
                xhr.send(params);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				jsonResponse = JSON.parse(xhr.responseText);
				user = new google.maps.LatLng(userLat, userLng);
				initMap(jsonResponse);
			}
		};
	});
}



function initMap(jsonResponse) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: user,
          zoom: 16
        });
	
	var userMarker = new google.maps.Marker({
		position: user,
		icon: 'userpin.png'
	});
	userMarker.setMap(map);



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
