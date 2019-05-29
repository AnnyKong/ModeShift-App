
window.onload = load();

function load() {
    return mockUpdate();
}
function mockUpdate() {
    DetectAndServe();
    loadIframe();
    setTimeout(function() {
        loadIframe();
        if ( window.orientation == 0 || window.orientation == 180 ) {
            if (confirm ('New updates available. Would you like to refresh it now?')){
                $('#exit-button').click();
                $('#live-updates').click();
                wait();
            }else{
                // alert("Your website is not refreshed.");
            }
        }
    }, 10000);
}
function DetectAndServe(){
    let os = getMobileOperatingSystem();
    var link = $('#transitgo-link');
    if (os == "Android") {
        link.attr("href","https://play.google.com/store/apps/details?id=co.bytemark.tgt&hl=en");
    } else if (os == "iOS") {
        link.attr("href","https://itunes.apple.com/us/app/transit-go-ticket/id1131345078?ls=1&mt=8");
    } else if (os == "Windows Phone") {
        link.attr("href","https://www.microsoft.com/en-us/store/p/transit-go-ticket/9nk8bzf1khd5");
    } else {
        link.attr("href","https://kingcounty.gov/depts/transportation/metro/fares-orca/transit-go-ticket.aspx");
    }
    console.log("Set os to " + os)
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function loadIframe() {
    // Get a handle to the iframe element
    var mapLayer = $('#map-layer');

    // Check if loading is complete
    if (  mapLayer.is(":visible") ) {
        // Find the iframes within our newly-visible element
        // $('#map-layer').find("iframe").prop("src", ()=>{return $('#route-map').data("src");})
        if ($('#route-map').contents().find('button#go').trigger( "click" )) {
                console.log("path load success")
        }
        return;
    }

    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(loadIframe, 100);
}

function wait() {
  // document.getElementById('se-pre-con').style.display='block';
  $("#se-pre-con").fadeIn("slow");
  setTimeout(
    function() {
      runSequence();
      // $("#line-1").fadeIn("slow");
      // $("#update-1").fadeIn("slow");
      // $("#update-2").fadeIn("slow");

      // $("#se-pre-con").fadeOut("slow");
    }, 2000);
}


/**
 * Sequence runner
 * @param {integer} i
 */
function runSequence(i) {
    // If i is null/false set it to 0
    i = ! i ? 0 : i;

    // Run animation on item i
    var promise = fade(i);

    // Use the promise to queue up the next item
    // by calling this function again when the
    // animation is complete
    promise.then(function() {
        if (i < updates.length-1) {
          runSequence(++i);
        }
    });
}

var updates = [$("#line-1"),$("#update-1"),$("#update-2"),$("#se-pre-con")];

/**
 * Fade in a specific indexed div element
 * @param {integer} i
 * @return {object} $.promise
 */
function fade(i)
{
  if (i == updates.length-1) {
    return updates[i]
        .fadeOut(400).promise();
  } else if (i == updates.length-2) {
    return updates[i]
        .fadeIn(600)
        .promise();
  } else {
    return updates[i]
        .fadeIn(400)
        .delay(400)
        .promise();
  }
}

// document.getElementById('line-1').style='';
// document.getElementById('update-1').style='';
// document.getElementById('update-2').style='';

// window.location =  
// document.getElementById('se-pre-con').style="display: none;";