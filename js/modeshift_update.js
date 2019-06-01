
window.onload = load();

function load() {
    return mockUpdate();
}
function mockUpdate() {
    DetectAndServe();
    hideIfNoCar();
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
        // alert("Operating System Detection fail: it seems you are using the computer, please" +
        //     " switch to the mobile phone for better access.\n\n" +
        //     "You may want to download the TransitGo App later for tickets.\n" +
        //     "(You will be able to select your App store (ios/Android/Windows)).")
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

function hideIfNoCar() {

    function noCarClickHandler(){
        $('#no-car').attr("clicked", true);
        $('#yes-car').attr("clicked", false);
        var searchBtnIsClicked = $('#search-btn').attr("clicked") == "true";
        if (!searchBtnIsClicked) {
            return;
        }
        $('#planyourroute > div > div.routes > div.other-routes').fadeOut();
        $('#planyourroute > div > div.routes > div.recommend-route > a ' +
            '> div > div.route > div.transport-block.car-block').fadeOut();
        $('#planyourroute > div > div.announcement').fadeOut();
    }
    function yesCarClickHandler(){
        $('#yes-car').attr("clicked", true);
        $('#no-car').attr("clicked", false);
        var searchBtnIsClicked = $('search-btn').attr("clicked") == "true";
        if (!searchBtnIsClicked) {
            return;
        }
        $('#planyourroute > div > div.routes > div.other-routes').fadeIn();
        $('#planyourroute > div > div.routes > div.recommend-route > a ' +
            '> div > div.route > div.transport-block.car-block').fadeIn();
        $('#planyourroute > div > div.announcement').fadeIn();
    }
    function searchClickHandler(){
        var val = $('#search-btn').attr("clicked") == "false" ? true : false;
        $('#search-btn').attr("clicked", val);
        $('#planyourroute > div > div.routes > div.other-routes').fadeIn();
        $('#planyourroute > div > div.routes > div.recommend-route > a ' +
            '> div > div.route > div.transport-block.car-block').fadeIn();
        $('#planyourroute > div > div.announcement').fadeIn();
    }
    function showMoreClickHandler(){
        $('#show-more').attr("clicked", true);
    }
    var noCar = document.getElementById('no-car');
    var yesCar = document.getElementById('yes-car');
    var searchBtn = document.getElementById('search-btn');
    var showMore = document.getElementById('show-more');
    noCar.addEventListener('click', noCarClickHandler);
    yesCar.addEventListener('click', yesCarClickHandler);
    searchBtn.addEventListener('click', searchClickHandler);
    showMore.addEventListener('click', showMoreClickHandler);

    function isNoCarAndShowMoreClicked (){
        var showMoreIsClicked = $('#show-more').attr("clicked") == "true";
        var noCarIsClicked = $('#no-car').attr("clicked") == "true";
        if (noCarIsClicked && showMoreIsClicked) {
            $('body > div.for-mobile > div.route-page > div.result-layer > div.chosen-route > ' +
                'div.route-item > div.route > div.transport-block.car-block').hide();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(2)').hide();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(3)').hide();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(4)').hide();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(5)').hide();
            $('#walking-txt1').html('Downtown Seattle');
            $('#google-map-link1').attr("href",
                "https://www.google.com/maps/dir/Downtown+Seattle,+Seattle,+WA/Pine" +
                "+St+%26+9th+Ave,+Seattle,+WA+98101/@47.6092297,-122.3390416,16z/data=" +
                "!3m1!4b1!4m14!4m13!1m5!1m1!1s0x54906ab6b122572d:0x4cc65f51348e1d43!2m2" +
                "!1d-122.3343709!2d47.6050242!1m5!1m1!1s0x54906ab54fb5f9f3:0x35f93e4a72f02" +
                "535!2m2!1d-122.332138!2d47.6134148!3e2");

        } else {
            $('body > div.for-mobile > div.route-page > div.result-layer > div.chosen-route > ' +
                'div.route-item > div.route > div.transport-block.car-block').show();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(2)').show();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(3)').show();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(4)').show();
            $('body > div.for-mobile > div.route-page > div.result-layer > div:nth-child(5)').show();
            $('#walking-txt1').html('1465 6th Ave. - US Bank Centre Garage');
            $('#google-map-link1').attr("href",
                "https://www.google.com/maps/dir/U.S.+Bank+Centre,+1420+5th+Ave,"+
                "+Seattle,+WA+98101/Pine+St+%26+9th+Ave,+Seattle,+WA+98101/@47.6118993," +
                "-122.3355064,17z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x54906ab48a630c39:0"+
                "xc167d1611231e41e!2m2!1d-122.334145!2d47.6103222!1m5!1m1!1s0x54906ab54fb" +
                "5f9f3:0x35f93e4a72f02535!2m2!1d-122.332138!2d47.6134148!3e2");
        }
    }
    function isNoCarClicked (){
        var noCarIsClicked = $('#no-car').attr("clicked") == "true";
        var yesCarIsClicked = $('#yes-car').attr("clicked") == "true";
        var searchBtnIsClicked = $('#search-btn').attr("clicked") == "true";
        if (!searchBtnIsClicked) {
            return;
        }
        if (noCarIsClicked && !yesCarIsClicked) {
            $('#planyourroute > div > div.routes > div.other-routes').hide();
            $('#planyourroute > div > div.routes > div.recommend-route > a ' +
                '> div > div.route > div.transport-block.car-block').hide();
            $('#planyourroute > div > div.announcement').hide();
        } else {
            $('#planyourroute > div > div.routes > div.other-routes').show();
            $('#planyourroute > div > div.routes > div.recommend-route > a ' +
                '> div > div.route > div.transport-block.car-block').show();
            $('#planyourroute > div > div.announcement').show();
        }
    }
    function fitStyle (){
        var on = "color: rgb(34, 96, 255); background-color: rgb(200, 216, 255);";
        var off = "color: rgb(114, 114, 114); background-color: rgb(250, 250, 250);";
        var noCarIsClicked = ""+ $('#no-car').attr('style') == on;
        var yesCarIsClicked = ""+ $('#yes-car').attr("style") == on;
        $('#no-car').attr("clicked", noCarIsClicked);
        $('#yes-car').attr("clicked", yesCarIsClicked);
    }

    setInterval(fitStyle, 500);
    setInterval(isNoCarAndShowMoreClicked, 500);
    setInterval(isNoCarClicked, 200);

}

function loadIframe() {
    // Get a handle to the iframe element
    var mapLayer = $('#map-layer');

    // Check if loading is complete
    if (  mapLayer.is(":visible") ) {
        // Find the iframes within our newly-visible element
        if ($('#route-map').contents().find('button#go').trigger( "click" )) {
                console.log("path load success");
        }
        return;
    }

    // If we are here, it is not loaded. Set things up so we check the status again in 100 milliseconds
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
