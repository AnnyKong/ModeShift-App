// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initMap() {
    var center = new google.maps.LatLng(47.590045, -122.270962);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 12,
    mapTypeControl: false,
    fullscreenControl: false,
    // zoomControl:false
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

    // Adds a Places search box. Searching for a place will center the map on that
    // location.
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
        document.getElementById('bar'));
    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autoc'));
    autocomplete.bindTo('bounds', map);
    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
    });


    for (var i = 0; i < orangeLines.length; i++) {
        drawTrafficLine(map, orangeLines[i][0], orangeLines[i][1], "#fd6e3d");
    }

    for (var i = 0; i < redLines.length; i++) {
        drawTrafficLine(map, redLines[i][0], redLines[i][1], "#FF0000");
    }

  // var styles = [
  //   {
  //     stylers: [
  //       { hue: "#00ffe6" },
  //       { saturation: -20 }
  //     ]
  //   },{
  //     featureType: "road",
  //     elementType: "geometry",
  //     stylers: [
  //       { lightness: 100 },
  //       { visibility: "simplified" }
  //     ]
  //   },{
  //     featureType: "road",
  //     elementType: "labels",
  //     stylers: [
  //       { visibility: "off" }
  //     ]
  //   }
  // ];
  //
  // map.setOptions({styles: styles});

  var flightPlanCoordinates = [
    {lat: 47.590380, lng: -122.285647},
    {lat: 47.589660, lng: -122.254236}
  ];
  var flightPlanCoordinates2 = [
    {lat: 47.589951, lng: -122.285939},
    {lat: 47.589268, lng: -122.254213}
  ];
  var flightPlanCoordinates3 = [
    {lat: 47.589268, lng: -122.254213},
    {lat: 47.589951, lng: -122.285939}
    
  ];
  addLine(flightPlanCoordinates, map, '#FF0000');
  addLine(flightPlanCoordinates2, map, '#FF0000');
  addCircle(center, 4000, map);
  addMarker(center, map);
}

var redLines = [
    [[47.581534, -122.218025], [47.589682, -122.255656]],
    [[47.589278, -122.255538], [47.586189, -122.228968]],
    [[47.590347, -122.283866], [47.593046, -122.323214]],
    [[47.624155, -122.328325], [47.571618, -122.293038]],
    [[47.624918, -122.302445], [47.588877, -122.302570]]
];
var orangeLines = [
    [[47.580109, -122.248027], [47.589321, -122.252983]],
    [[47.574267, -122.319593], [47.615251, -122.354728]],
    [[47.635542, -122.301729], [47.590215, -122.297556]],
    [[47.615256, -122.320795], [47.589951, -122.285608]]
];

function renderDirections(result, map, color) {
    var directionsDisplay = new google.maps.DirectionsRenderer({
        preserveViewport: true
    });
    directionsDisplay.setOptions({
        polylineOptions: {
            strokeWeight: 4,
            strokeOpacity: 1,
            strokeColor: color // fd6e3d
        },
        suppressMarkers: true
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setDirections(result, map);
}

function drawTrafficLine(map, start, end, color) {
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService();
    var selectedMode = "DRIVING";
    var start = new google.maps.LatLng(start[0], start[1]);
    var end = new google.maps.LatLng(end[0], end[1]);
    // var WA520 = new google.maps.LatLng(47.644142, -122.304873);
    // Retrieve the start and end locations and create a DirectionsRequest
    directionsService.route({
        origin: start,
        destination: end,
        // waypoints: [{location: WA520}],
        travelMode: google.maps.TravelMode[selectedMode],
        // avoidTolls: true
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            // directionsDisplay.setDirections(response);
            renderDirections(response, map, color);

        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            wait = true;
            setTimeout("wait = true", 3000);
            alert("OQL: " + start + end + ": Load Traffic failed");
        } else {
            window.alert('Directions request failed due to ' + status);
        }
        // return true;
    });
}

$(window).load(initMap);


function addCircle(center, radius, map) {
  // Add the circle for this city to the map.
  var cityCircle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: center,
    radius: radius
  });
}

function addLine(flightPlanCoordinates, map, color) {
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 1.0,
      strokeWeight: 4
  });
  flightPath.setMap(map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var image = {
    // url: "https://image.flaticon.com/icons/png/128/179/179386.png",
    // url: "https://image.flaticon.com/icons/png/128/497/497738.png",
    url: "images/warning.png",
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(30, 30),
    // // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(15, 30)
  }
  var marker = new google.maps.Marker({
    position: location,
    // label: labels[labelIndex++ % labels.length],
    map: map,
    icon: image
  });
  addInfoWindow(
    "Incident: SeattleTanker, \
    will last ~3 hrs", 
    marker, map
  );
}

function addInfoWindow(contentString, marker, map) {
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

