var map;
  
(document).ready(function(){
    initMap();
});

function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 16
        });

        document.add
  
        var features = [
        {
                position: new google.maps.LatLng(42.3453, -71.0464)
        }
        ];

        for (var i = 0; i < features.length; i++) {
          var marker = new google.maps.Marker({
            position: features[i].position,
            icon: 'car.png',
            map: map
          });
          };

}
