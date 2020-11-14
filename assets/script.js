var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");


// button listener for search button

searchBtn.on("click", function(event){
    event.preventDefault();
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    buildQueryURL();
    
});


function buildQueryURL() {
       console.log(pubAmount);
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
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

 


