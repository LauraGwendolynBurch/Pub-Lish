$(document).ready(function(){

var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");
var localCity=localStorage.getItem("currentCity")
// var  = JSON.parse(localStorage.getItem("")) || []
var pubAmount=localStorage.getItem("numberOfPubs")
var marker;

// button listener for search button

searchBtn.on("click", function(event){
    event.preventDefault();
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    buildQueryURL();
   // local storage
   localStorage.setItem("currentCity", cityEl);
   localStorage.setItem("numberOfPubs", pubAmount)
  //  console.log(localStorage)
  //  console.log("currentCity")
});

function storeCity (){
  cityEl = localCity
  pubAmount = pubAmount
  console.log(pubAmount);
  buildQueryURL();

}

function buildQueryURL() {
       console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        for(var i=0;i<pubAmount;i++){
          console.log(response[i].longitude)
          createMarker(response[i].longitude, response[i].latitude);
        }
      }); 
     
};

  function createMarker(long, lat){
     marker = new mapboxgl.Marker()
    .setLngLat([long,lat])
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

 storeCity();
// button made to clear all local storage and text content should we need
// var clearButton = $("#button")

// function buttonClear(){
//     localStorage.clear();
//     location.reload();
// }

//create button event to call the clearing of local storage 
// $(clearButton).on("click",buttonClear)

})