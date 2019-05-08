var map;
function initMap() {
    var markerArray = [];
    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService();
    // Create a renderer for directions and bind it to the map.
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
    });
    var downtown = new google.maps.LatLng(47.6062, -122.3321);
    var center = new google.maps.LatLng(47.6362, -122.3321);
    var mapOptions = {
        center: center,
        zoom: 13
    };
    // Create a map and center it
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
    // Instantiate an info window to hold step text.
    var stepDisplay = new google.maps.InfoWindow;
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    var control = document.getElementById('floating-panel');
    control.style.display = 'block';
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    // Display the route between the initial start and end selections.
    calculateAndDisplayRoute(directionsService, directionsDisplay, markerArray, stepDisplay, map);

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
}

function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
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
    // Retrieve the start and end locations and create a DirectionsRequest
    directionsService.route({
        origin: start,
        destination: end,
        waypoints: [{location: 'pacific place seattle'}],
        travelMode: google.maps.TravelMode[selectedMode],
        avoidTolls: true
    }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setDirections(response);
            // showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
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