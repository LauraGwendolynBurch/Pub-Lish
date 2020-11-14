var searchBtn = $()
var cityEl = $()
var mapEl = $()
var listEl = $()
var mapEl=$("#map");


  function createMarker(long, lat){
    var marker = new mapboxgl.Marker()
    .setLngLat([long,lat])
    .addTo(map);
}
    
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
     },
        trackUserLocation: true
 }));

//  <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />

// <div id='map' style='width: 400px; height: 300px;'></div>

//  <script>
// mapboxgl.accessToken = 'pk.eyJ1IjoidGJvbmQ0IiwiYSI6ImNraGVhOG51dDAwaDgydHBqbmNncnoxbngifQ.2PVL5DYBnVm1EeZOIUwTXw';
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11'
// });
// </script>