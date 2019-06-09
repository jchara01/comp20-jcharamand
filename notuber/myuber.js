var map;
function initMap() {
    var SouthStation = {lat: 42.352271, lng: -71.05524200000001};
    var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: SouthStation})
    var marker = new google.maps.Marker({position: SouthStation, map: map});
}

async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA_IfcaaMVOEL4s8tVHPA6K5C4gD3joeTo&callback=initMap" ;

