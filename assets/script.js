var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");
var localCity=localStorage.getItem("currentCity")
// var  = JSON.parse(localStorage.getItem("")) || []
var pubAmount=localStorage.getItem("numberOfPubs")
// button listener for search button

searchBtn.on("click", function(event){
  event.preventDefault();
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    buildQueryURL();
   // local storage
   localStorage.setItem("currentCity", (cityEl));
   localStorage.setItem("numberOfPubs", JSON.stringify(pubAmount))
   // console.log(localStorage)
   // console.log("currentCity")
});



function buildQueryURL() {
       console.log(cityEl)
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


// button made to clear all local storage and text content should we need
// var clearButton = $("#button")

// function buttonClear(){
//     localStorage.clear();
//     location.reload();
// }

//create button event to call the clearing of local storage 
// $(clearButton).on("click",buttonClear)

