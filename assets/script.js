$(document).ready(function () {

  var searchBtn = $("#searchButton");
  var cityEl;
  var pubAmount;
  var localCity = localStorage.getItem("currentCity")
  var pubAmount = localStorage.getItem("numberOfPubs")
  var marker;
  var NameOfCity;
  var typeOfBrew;
  var searchResults = $("#search-result");
  var markerArr=[];
  deleteButtton=$("#search-result");


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

  deleteButtton.on("click","button",function(event){
    $(event.target).parent().remove();
  })


function buildQueryURL() {
       console.log(cityEl)
    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + cityEl + "&per_page=25";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      searchResults.empty();
      for (var i = 0, j = 0; j < pubAmount; i++) {
        NameOfCity = response[i].name;
        typeOfBrew = response[i].brewery_type;
        var divEL = $("<div>");
        var btnEl = $("<button>");


       



        divEL.addClass("notification");
        btnEl.addClass("delete");
        divEL.addClass("textBox");
        var breweryName = response[i].name;
        var breweryAddress = response[i].street;
        var breweryType = response[i].brewery_type;
        var breweryURL = response[i].website_url;
        var sp = "-"

        // working on delete button
        // working on savebutton
        divEL.append(`${breweryName} <br> ${breweryType} <br> ${breweryAddress} <br> ${breweryURL}`, btnEl);


        if (response[i].longitude == null
              || response[i].brewery_type == null
              || response[i].brewery_type == "large"
              || response[i].brewery_type == "planning"
              || response[i].brewery_type == "bar"
              || response[i].brewery_type == "contract"
              || response[i].brewery_type == "proprietor"
              || response[i].brewery_type == "closed" ) {

        } else {
          createMarker(response[i].longitude, response[i].latitude);
          searchResults.append(divEL);
          j++;
        }
      }
    });

  };

  function createMarker(long, lat) {
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
