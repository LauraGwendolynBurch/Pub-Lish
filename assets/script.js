$(document).ready(function () {

  var searchBtn = $("#searchButton");
  var cityEl;
  var pubAmount;
  var mapEl = $("#map");
  var localCity = localStorage.getItem("currentCity")
  // var  = JSON.parse(localStorage.getItem("")) || []
  var pubAmount = localStorage.getItem("numberOfPubs")
  var marker;
  var NameOfCity;
  var typeOfBrew;
  var cityZip;
  var breweryName;
  var breweryAddress;
  var brewery_type;
  var breweryURL;
  var searchResults = $("#search-result");
  var markerArr=[];


  searchBtn.on("click", function (event) {
    event.preventDefault();
    
    for(var j=0;j<markerArr.length;j++){
      removeMarker(markerArr[j]);
    }
      
    
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    $("#cityName").val("");
   buildQueryURL();
   localStorage.setItem("currentCity", cityEl);
   localStorage.setItem("numberOfPubs", pubAmount)
});


  function storeCity() {
    cityEl = localCity
    pubAmount = pubAmount
    console.log(pubAmount);
    buildQueryURL();

  };
  
  // delete button for row (currently working to show button on all rows). 
  function deleteBrewery() {
    var deleteBreweryButton = $('<td><button>X</button></td>').click(function(event) {
      
    });
  };

  //  save button for row
  // function saveBrewery() {
  //   var saveBreweryButton = $("<td><button>save</button></td>").click(function() {
  //   });
  // };

function buildQueryURL() {
       console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount * 2 ;
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        searchResults.empty();
        for(var i=0;i<pubAmount;i++){
          NameOfCity=response[i].name;
          typeOfBrew=response[i].brewery_type;
        var tRow = $("<tr>");
        var breweryName = $("<td>").text(response[i].name);
        var breweryAddress = $("<td>").text(response[i].street);
        var breweryType = $("<td>").text(response[i].brewery_type);
        var breweryURL = $("<td>").text(response[i].website_url);
        // working on delete button
        // working on savebutton
        tRow.append(breweryName, breweryAddress, breweryType, breweryURL, deleteBrewery);
        searchResults.append(tRow);
            if(response[i].longitude == null){
             
            }else{
          createMarker(response[i].longitude, response[i].latitude);
            }
        }
      }); 
     
};

  function createMarker(long, lat){
    // // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `${NameOfCity} 
      <br>
      Type of Brewery: ${typeOfBrew}`
    );

    marker = new mapboxgl.Marker()
      .setLngLat([long, lat])
      .setPopup(popup)
      .addTo(map);
      markerArr.push(marker);
    
      fly(long, lat);
  }

  function fly(long, lat) {
    map.flyTo({
      center: [long, lat],
      essential: true
    });
  }
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));

  function removeMarker(marker) {
    marker.remove();
  }



  storeCity();

})
