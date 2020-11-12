$(document).ready(function(){

var searchBtn = $()
var cityEl = $()
var mapEl = $()
var listEl = $()





$(".searchBtn").on("click", function(event){
    var cityBox = $(this).siblings(".textEl").val()
    // console.log
    var textId =  $(this).siblings(".textEl").attr("id")
    //console.log
    localStorage.setItem(textId, cityBox);
})
 //appending the text to assigned row once browser page is refreshed 
 $("#input9").append(localStorage.getItem("input9"));



// button made to clear all local storage and text content should we need
// var clearButton = $("#button")

// function buttonClear(){
//     localStorage.clear();
//     location.reload();
// }

//create button event to call the clearing of local storage 
// $(clearButton).on("click",buttonClear)

})