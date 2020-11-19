$(document).ready(function(){

var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");
var localCity=localStorage.getItem("currentCity")
// var  = JSON.parse(localStorage.getItem("")) || []
var pubAmount=localStorage.getItem("numberOfPubs")
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
   localStorage.setItem("currentCity", cityEl);
   localStorage.setItem("numberOfPubs", pubAmount)
});

function storeCity (){
  cityEl = localCity
  pubAmount = pubAmount
  console.log(pubAmount);
  buildQueryURL();

}

function buildQueryURL() {
       console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount * 2 ;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        for(var i=0;i<pubAmount;i++){
          NameOfCity=response[i].name;
          typeOfBrew=response[i].brewery_type;
            if(response[i].longitude == null){
             
            }else{
          createMarker(response[i].longitude, response[i].latitude);
            }
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
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `${NameOfCity} 
      <br>
      Type of Brewery: ${typeOfBrew}`
    );

     marker = new mapboxgl.Marker()
    .setLngLat([long,lat])
    .setPopup(popup)
    .addTo(map);
    fly(long,lat);
}

    function fly(long,lat){
      map.flyTo({
        center: [long,lat],
        essential: true 
        });
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