var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
// var mapEl = $()
// var listEl = $()
var mapEl=$("#map");


// button listener for search button

searchBtn.on("click", function(){
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber");
    buildQueryURL();
    console.log(searchBtn);
});



function buildQueryURL() {
       
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response)
      }); 
           
};

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
