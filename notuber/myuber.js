var map;

var user;
var userMarker;
var userLat;
var userLng;
var params;
var vehicles;

var xhr = new XMLHttpRequest();
xhr.open("POST", "https://hans-moleman.herokuapp.com/rides", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


var infowindow = new google.maps.InfoWindow();


function getUserLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = position.coords.latitude;
		userLng = position.coords.longitude;
		params = "username=iXay9qIa&lat=" + userLat + "&lng=" + userLng;
                xhr.send(params);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				vehicles = JSON.parse(xhr.responseText);
				user = new google.maps.LatLng(userLat, userLng);
				initMap(vehicles);
			}
		}
	});
}



function initMap(vehicles) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: user,
          zoom: 16
        });
	
	var userMarker = new google.maps.Marker({
		position: user,
		icon: 'userpin.png'
	});
	userMarker.setMap(map);
	
	var features = [];
	
	for (var i = 0; i < vehicles.length; i++) {
		var vehiclePos = new google.maps.LatLng(vehicles[i]["lat"],  vehicles[i]["lng"]);
		var vehicleLat = vehiclePos.lat();
		var vehicleLng = vehiclePos.lng();
		
          	var marker = new google.maps.Marker({
            		position: vehiclePos,
            		icon: 'car.png',
			title: vehicles[i]["username"],
           		map: map
          	});
         	vehicles.push(marker);
          	vehicles[i].setMap(map);
	}


}
