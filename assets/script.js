var searchBtn = $("#searchButton");
var cityEl;
var pubAmount;
var mapEl=$("#map");


// button listener for search button

$(searchBtn).on("click", function(event){
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber");
    buildQueryURL();
    console.log(searchBtn);
    // localStorage
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


// button made to clear all local storage and text content should we need
// var clearButton = $("#button")

// function buttonClear(){
//     localStorage.clear();
//     location.reload();
// }

//create button event to call the clearing of local storage 
// $(clearButton).on("click",buttonClear)

