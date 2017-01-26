var panorama;
function initialize() {
    var berkeley = {lat: 37.869085, lng: -122.254775};
    var eightyFive = {lat: 22.6088617, lng: 120.29969};
    var sv = new google.maps.StreetViewService();

    // sv.getPanorama({location: {lat: 22.600861, lng: 120.290359}, radius: 250}, checkNearestStreetView);

    getLocation();

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('map'),
        {
          addressControl: false,
          clickToGo: false,
          draggable: true,
          fullscreenControl: false,
          imageDateControl: false,
          linksControl: false,
          mapTypeControl: false,
          motionTrackingControl: false,
          panControl: false,
          position: eightyFive,
          scaleControl: false,
          scrollwheel: false,
          showRoadLabels: false,
          zoomControl: false,
          pov: {heading: 25, pitch: 30},
          zoom: 1
        }
    );
}

function checkNearestStreetView(data, status) {
    if (status === google.maps.StreetViewStatus.OK) {
        panorama.setPano(data.location.pano);
        panorama.setVisible(true);
        console.log(data.location.pano);
        // return latLng;
    }else{
        console.log('none');
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
        $('.mainTitle').addClass('loaded');
    }
}

if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * 3.14 / 180;
    }
}

function hvs2(latA, longA, latB, longB){
    var dLat = (latA - latB).toRad(); 
    var dLon = (longA - longB).toRad();
    var dLatDiv2 = dLat / 2;
    var dLonDiv2 = dLon / 2;
    var latBRad = latB.toRad();
    var latBRadCos = Math.cos(latBRad);
    var dLatDiv2Sin = Math.sin(dLatDiv2);
    var dLonDiv2Sin = Math.sin(dLonDiv2);
    var a = dLatDiv2Sin * dLatDiv2Sin + latBRadCos * latBRadCos * dLonDiv2Sin * dLonDiv2Sin;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function showPosition(position) {
    var sv = new google.maps.StreetViewService();

    console.log('latitude', position.coords.latitude);
    console.log('longitude', position.coords.longitude);

    var nearest, site;

    var path;
    if (window.location.host.indexOf("localhost") !== -1)
        path = 'json/'
    else
        path = 'https://statics.mirrormedia.mg/story/json/air_jsons/'

    $.getJSON(path+'air_jsonlist.json', function(data) {
        if(position.coords.latitude >= data.north_bound) {
            //north
            console.log('north');
            nearest = hvs2(position.coords.latitude, position.coords.longitude, data.north[0].latitude, data.north[0].longitude);
            site = data.north[0].path;
            data.north.forEach(function(o){
                var distance = hvs2(position.coords.latitude, position.coords.longitude, o.latitude, o.longitude);
                if( distance <= nearest ){
                    nearest = distance;
                    site = o.path;
                }
            });
        }else
            if(position.coords.latitude < data.north_bound){
                //south
                console.log('south');
                nearest = hvs2(position.coords.latitude, position.coords.longitude, data.south[0].latitude, data.south[0].longitude);
                site = data.south[0].path;
                data.south.forEach(function(o){
                    var distance = hvs2(position.coords.latitude, position.coords.longitude, o.latitude, o.longitude);
                    if( distance <= nearest ){
                        nearest = distance;
                        site = o.path;
                    }
                });
            }else{
                //central
                console.log('central');
                nearest = hvs2(position.coords.latitude, position.coords.longitude, data.central[0].latitude, data.central[0].longitude);
                site = data.central[0].path;
                data.central.forEach(function(o){
                    var distance = hvs2(position.coords.latitude, position.coords.longitude, o.latitude, o.longitude);
                    if( distance <= nearest ){
                        nearest = distance;
                        site = o.path;
                    }
                });
            }

        // console.log(site);

        // https://statics.mirrormedia.mg/story/json/air_jsons/
        $.getJSON(path+site, function(siteData) {
            // console.log(siteData)

            $('#temperature').html(siteData.feeds[siteData.data_number-1].s_t0);
            $('#humidity').html(siteData.feeds[siteData.data_number-1].s_h0);
            $('#wind').html(siteData.EPA_site.WindSpeed);

            $('#PM10-Number').html(siteData.feeds[siteData.data_number-1].s_d1);
            $('#PM25-Number').html(siteData.feeds[siteData.data_number-1].s_d0);
            $('#O3-Number').html(siteData.EPA_site.O3);
            $('#NOx-Number').html(siteData.EPA_site.NOx);
            $('#SO2-Number').html(siteData.EPA_site.SO2);

            $('#AQI-Number').html(siteData.EPA_site.AQI);
            if(siteData.EPA_site.AQI >= 301) {
                $('.AQI-Explain-Hazardous').show();
                $('.AQI-Status-Hazardous').show();
                $('.AQI-Color').addClass('AQI-Color-Hazardous');
            }
            if(siteData.EPA_site.AQI >= 201 && siteData.EPA_site.AQI <= 300) { 
                $('.AQI-Explain-VeryUnhealthy').show();
                $('.AQI-Status-VeryUnhealthy').show();
                $('.AQI-Color').addClass('AQI-Color-VeryUnhealthy');
            }
            if(siteData.EPA_site.AQI >= 151 && siteData.EPA_site.AQI <= 200) { 
                $('.AQI-Explain-Unhealthy').show();
                $('.AQI-Status-Unhealthy').show();
                $('.AQI-Color').addClass('AQI-Color-Unhealthy');
            }
            if(siteData.EPA_site.AQI >= 101 && siteData.EPA_site.AQI <= 150) { 
                $('.AQI-Explain-UnhealthySensitive').show();
                $('.AQI-Status-UnhealthySensitive').show();
                $('.AQI-Color').addClass('AQI-Color-UnhealthySensitive');
            }
            if(siteData.EPA_site.AQI >=  51 && siteData.EPA_site.AQI <= 100) { 
                $('.AQI-Explain-Moderate').show();
                $('.AQI-Status-Moderate').show();
                $('.AQI-Color').addClass('AQI-Color-Moderate');
            }
            if(siteData.EPA_site.AQI <=  50) {
                $('.AQI-Explain-Good').show();
                $('.AQI-Status-Good').show();
                $('.AQI-Color').addClass('AQI-Color-Good');
            }
        });
    });

    sv.getPanorama({location: {lat: position.coords.latitude, lng: position.coords.longitude}, radius: 250}, checkNearestStreetView);
    $('.mainTitle').addClass('loaded');
}

function openWindow(target) {
    ga('send', 'event', 'project', 'click', target);
    $('.infoWindow').removeClass('active');
    $(target).addClass('active');
}

$(document).ready(function() {

    $('#fullpage').fullpage({
        verticalCentered: true,
        sectionsColor: ['#f2f2f2', '#000', 'whitesmoke', '#FFF', '#ccddff'],
        autoScrolling: false,
        fitToSection: false,
        menu: '#menu',
        afterRender: function () {
            //Start the whole shabang when DOM and APIs are ready by calling initialize()
            initialize();
        },
        afterLoad: function(anchor, index){
            if(index == 1) {
                $('div.nav').hide();
            }else{
                $('div.nav').show();
            }
            if(index >= 3 && index <= 9) {
                $('li[data-menuanchor="p2-1"]').addClass('activeK');
            }else{
                $('li[data-menuanchor="p2-1"]').removeClass('activeK');
            }

            if(index == 3) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');

                $('#money').animateNumber({
                    number: 210000000000,
                    numberStep: comma_separator_number_step
                },2000);
            }
        }
    });

    // Google Map Streeview Fix (Can not scroll the page on the Streetview)
    var map = $('div.section:first');
    map.mousewheel(function(event) {
        // console.log(event.deltaY);
        // console.log('window scrollTop', $(window).scrollTop());
        $('html, body').scrollTop($(window).scrollTop()-event.deltaY);
    });

    $('.continue').click(function(){
        $.fn.fullpage.moveSectionDown();
    });

    $.dfp({
        dfpID:'40175602',
        setCentering: true,
        sizeMapping: {
            'default': [
                { browser: [    0,   0 ], ad_sizes: [] },
                { browser: [  970, 200 ], ad_sizes: [ [ 970, 90 ], [ 970, 250 ], [ 300, 250 ], [ 300, 600 ] ] }
            ],
            'mobile-only': [
                { browser: [    1,   1 ], ad_sizes: [ [ 320, 100 ], [ 300, 250 ], [320, 480] ] },
                { browser: [  970, 200 ], ad_sizes: [] }
            ]
        }
    });

});