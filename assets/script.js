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



  searchBtn.on("click", function (event) {
    event.preventDefault();
    cityEl = $("#cityName").val();
    pubAmount = $("#pubNumber").val();
    $("#cityName").val("");
    // zipCode();
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


  function buildQueryURL() {
    console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=" + pubAmount;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < pubAmount; i++) {
        var tRow = $("<tr>");
        var breweryName = $("<td>").text(response[i].name);
        var breweryAddress = $("<td>").text(response[i].street);
        var breweryType = $("<td>").text(response[i].brewery_type);
        var breweryURL = $("<td>").text(response[i].website_url);
        // working on delete button
        // working on savebutton
        tRow.append(breweryName, breweryAddress, breweryType, breweryURL, deleteBrewery);
        $("#search-result").append(tRow);
        createMarker(response[i].longitude, response[i].latitude);
      }
    });

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


  // function mySave() {
  //   var myContent = document.getElementById("myTextarea").value;
  //   localStorage.setItem("myContent", myContent);
  // }





  // // possible zipcode render
  // // function zipCode() {
  // //   var queryURLZip = "https://api.openbrewerydb.org/breweries?by_postal=" + cityZip + "&per_page=" + pubAmount;
  // //   $.ajax({
  // //     url: queryURLZip,
  // //     method: "GET"
  // //   }).then(function (response) {
  // //     console.log(response);
  // //     for (var i = 0; i < pubAmount; i++) {
  // //       var tRow = $("<tr>");
  // //       var breweryName = $("<td>").text(response[i].name);
  // //       var breweryAddress = $("<td>").text(response[i].street);
  // //       var breweryType = $("<td>").text(response[i].brewery_type);
  // //       var breweryURL = $("<td>").text(response[i].website_url);
  // //       // working on delete button
  // //       // working on savebutton
  // //       // var deleteBrewery = $("<button>").on("click", function());
  // //       tRow.append(breweryName, breweryAddress, breweryType, breweryURL);
  // //       $("#search-result").append(tRow);
  // //       createMarker(response[i].longitude, response[i].latitude);
  // //     }
  // //   });


  // };

  function createMarker(long, lat) {

    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      NameOfCity +
      " Type of Brewery: " + typeOfBrew
    );

    marker = new mapboxgl.Marker()
      .setLngLat([long, lat])
      .setPopup(popup)
      .addTo(map);
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
  // button made to clear all local storage and text content should we need
  // var clearButton = $("#button")

  // function buttonClear(){
  //     localStorage.clear();
  //     location.reload();
  // }

  //create button event to call the clearing of local storage 
  // $(clearButton).on("click",buttonClear)

})