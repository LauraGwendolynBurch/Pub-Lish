var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");
var marker;
var NameOfCity;
var typeOfBrew;

// button listener for search button

searchBtn.on("click", function(event){
    event.preventDefault();
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    $("#cityName").val("");
    buildQueryURL();
  // local storage
  
});

function buildQueryURL() {
       console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        for(var i=0;i<pubAmount;i++){
          NameOfCity=response[i].name;
          typeOfBrew=response[i].brewery_type;
          createMarker(response[i].longitude, response[i].latitude);
        }
      }); 
           
};

  function createMarker(long, lat){

    // mapboxgl.accessToken = 'pk.eyJ1IjoidGJvbmQ0IiwiYSI6ImNraGVhOG51dDAwaDgydHBqbmNncnoxbngifQ.2PVL5DYBnVm1EeZOIUwTXw';
    // marker= [long,lat];
    // var map = new mapboxgl.Map({
    // container: 'map',
    // style: 'mapbox://styles/mapbox/light-v10',
    // center: marker,
    // zoom: 15
    // });
     
    // // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      NameOfCity + 
      " Type of Brewery: " + typeOfBrew 
    );
     
    // // create DOM element for the marker
    // var el = document.createElement('div');
    // el.id = 'marker';

    // new mapboxgl.Marker(el)
    // .setLngLat(marker)
    // .setPopup(popup) // sets a popup on this marker
    // .addTo(map1);
    // console.log(map1);

     marker = new mapboxgl.Marker()
    .setLngLat([long,lat])
    .setPopup(popup)
    .addTo(map);
    
}
    
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
     },
        trackUserLocation: true
 }));

 function removeMarker(marker){
  marker.remove();
 }
 


