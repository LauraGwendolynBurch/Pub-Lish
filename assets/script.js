$(document).ready(function(){

var searchBtn = $("#searchButton")
var cityEl = $("#cityName")
var pubAmount = $("#pubNumber")
var listEl = $()
var mapEl=$("#map");




 $(".searchBtn").on("click", function(event){
    var cityBox = $(this).siblings(".textEl").val()
    // console.log
    var textId =  $(this).siblings(".textEl").attr("id")
    //console.log
    localStorage.setItem(textId, cityBox);
 })
  //appending the text to assigned row once browser page is refreshed 
  $("#input9").append(localStorage.getItem("input9"));









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

})
