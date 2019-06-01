var map;
function initMap() {
    var markerArray = [];
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService();
    // Create a renderer for directions and bind it to the map.
    var directionsDisplay = new google.maps.DirectionsRenderer({
        // draggable: true,
        map: map,
        // panel: document.getElementById('right-panel')
    });
    var downtown = new google.maps.LatLng(47.6062, -122.3321);
    var center = new google.maps.LatLng(47.600698, -122.258410);
    var mapOptions = {
        center: center,
        zoom: 11,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    };
    // Create a map and center it
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // var trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);
    draw(map);

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
        polylineOptions: {
            strokeWeight: 4,
            strokeOpacity: 1,
            strokeColor:  '#2260ff'
        },
        suppressMarkers: true
    });
    // Instantiate an info window to hold step text.
    var stepDisplay = new google.maps.InfoWindow;
    // directionsDisplay.setPanel(document.getElementById('right-panel'));
    // var control = document.getElementById('floating-panel');
    // control.style.display = 'block';
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    // Display the route between the initial start and end selections.
    // calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, stepDisplay, map);

    directionsDisplay.addListener('directions_changed', function() {
        computeTotalDistance(directionsDisplay.getDirections());
    });
    // Listen to change events.
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, stepDisplay, map);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
    document.getElementById('mode').addEventListener('change', onChangeHandler);
    document.getElementById('go').addEventListener('click', onChangeHandler);
}
// change();

function change() {
    $('button#go').click();
    if ($('#route-map').contents().find('button#go').trigger( "click" )) {
        console.log("success")
    } else {
        console.log('bad')
    }
}

function draw(map) {
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
    var center = new google.maps.LatLng(47.590045, -122.270962);
    addLine(flightPlanCoordinates, map, '#FF0000');
    addLine(flightPlanCoordinates2, map, '#FF0000');
    addCircle(center, 4000, map);
    addMarker(center, map);
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    // document.getElementById('total').innerHTML = total + ' km';
}

function calculateAndDisplayRoute(directionsService, directionsDisplay,
                                  markerArray, stepDisplay, map) {
    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    var selectedMode = document.getElementById('mode').value;
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var WA520 = new google.maps.LatLng(47.644142, -122.304873);
    // Retrieve the start and end locations and create a DirectionsRequest
    directionsService.route({
        origin: start,
        destination: end,
        waypoints: [{location: WA520}],
        travelMode: google.maps.TravelMode[selectedMode],
        // avoidTolls: true
    }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            // document.getElementById('warnings-panel').innerHTML =
            //     '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            // showSteps(response, markerArray, stepDisplay, map);
            start_pt = new google.maps.LatLng(47.605030, -122.334373);
            end_pt = new google.maps.LatLng(47.584462, -122.148206);
            pinA = new google.maps.Marker({
                position: start_pt,
                map: map
            });
            pinB = new google.maps.Marker({
                position: end_pt,
                map: map
            });
        } else {
            window.alert('Directions request failed due to ' + status);
        }
        return true;
    });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}

function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}

function switchLayer(e) {
    if (e.value === "traffic") {
        initMap();
        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    } else if (e.value === "transit") {
        initMap();
        var transitLayer = new google.maps.TransitLayer();
        transitLayer.setMap(map);
    } else if (e.value === "bicycle") {
        initMap();
        var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    } else {
        initMap();
    }

}

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
        strokeWeight: 5
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

$(window).load(initMap);