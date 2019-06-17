var map;

var user;
var userMarker;
var userLat = 0;
var userLng = 0;
var params;
var vehicles;

var xhr = new XMLHttpRequest();
var url = "https://hans-moleman.herokuapp.com/rides";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

var curDistance = 1000000000000000;


window.onload = function getUserLocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = position.coords.latitude;
		userLng = position.coords.longitude;
		params = 'username=iXay9qIa&lat=' + userLat + '&lng=' + userLng;
                xhr.send(params);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				vehicles = JSON.parse(xhr.responseText);
				user = new google.maps.LatLng(userLat, userLng);
			}
			var infowindow = new google.maps.InfoWindow();
	
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
				features.push(marker);
				features[i].setMap(map);

				var distance = calculateDistance(vehicleLat, vehicleLng);
				if (distance <= curDistance){
					curDistance = distance;
					var paths = [
						[
						[userLat, userLng],
						[vehicleLat, vehicleLng]
						]
					];
					
					var polyline = new google.maps.Polyline ({
						map: map,
						path: paths,
						geodesic: true,
						strokeColor: '#FF0000',
						strokeOpacity: 1.0,
						strokeWeight: 2
					});
					polyline.setMap(map);

					google.maps.event.addListener(userMarker, 'mouseover', function() {
						infowindow.setContent(this.polyline);
						infowindow.open(map, this);
					});
					google.maps.event.addListener(userMarker, 'mouseout', function() {
						infowindow.close();
					});

				}

			}
		}
	});
	
}



function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: user,
          zoom: 16
        });
	
	var userMarker = new google.maps.Marker({
		position: user,
		icon: 'userpin.png',
	});
	userMarker.setMap(map);
	
}

function calculateDistance(vehicleLat, vehicleLng) {
	var R = 6371e3;
	var lat1 = toRadians(userLat);
	var lat2 = toRadians(vehicleLat);
	var lon1 = toRadians(userLng);
	var lon2 = toRadians(vehicleLng);
	
	var Δφ = lat2-lat1;
	var Δλ = lon2-lon1;

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        	Math.cos(lat1) * Math.cos(lat2) *
        	Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	
	return d.toFixed(3);
	
	function toRadians(x) {
		return x * (Math.PI) / 180;
	}
}

