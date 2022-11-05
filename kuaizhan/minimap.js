
mapboxgl.accessToken = "pk.eyJ1IjoiNTkxMTk5NzM2IiwiYSI6ImNrdTB2Z2k2MDB5N24ycG93aDV1NDM3czIifQ.R0sRRZwgEDoEyZBF8F1NRA";
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/591199736/cla17g1pb000314s4rs9sp4uu",
    center: [113.385,23.0686],
    zoom: 18,
    maxBounds:[113.377,23.059,113.391,23.076],
    pitch: 15,

});

map.on("load", function () {
    map.addControl(new mapboxgl.Minimap({
        center: [113.386,23.0671],
        zoom: 14,
        zoomLevels: []
    }), 'top-left');
});

document.getElementById('fly').addEventListener('click', () => {
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;
        const center={lat:crd.latitude, lng:crd.longitude};

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        console.log(typeof center);
        console.log(typeof crd.longitude);


        // Fly to a random location
        map.flyTo({
            zoom: 19,
            center: center,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);


});


map.on('click', 'six-map', (e)=> {
    const features = map.queryRenderedFeatures(e.point,{layers: ['six-map']});

// Limit the number of properties we're displaying for
// legibility and performance
    const displayProperties = [
        'id',
    ];

    const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
            displayFeat[prop] = feat[prop];
        });
        return displayFeat;
    });

// Write object as string with an indent of two spaces.
    document.getElementById('features').innerHTML = JSON.stringify(
        displayFeatures[0],
        null,
        2
    );

    var Oid=console.log(displayFeatures[0]['id']);


    $(document).ready(function () {
        $('.map-overlay').load('kuaizhan/id1.html?Oid='+Oid)

    });
//�����ɹ��ĸ���
    map.setFilter('six-highlight', [
        "match", [ "id" ],[features.properties.id], true, false
    ]);


});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'six-map', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'six-map', () => {
    map.getCanvas().style.cursor = '';
});

//id1
document.getElementById('SOHUCS').sid = Oid;

(function(){
    var appid = 'cywmtHwew';
    var conf = 'prod_2a47cefc3af4d57b5610e564c021d8ad';
    var width = window.innerWidth || document.documentElement.clientWidth;
    if (width < 1000) {
        var head = document.getElementsByTagName('head')[0]||document.head||document.documentElement;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.id = 'changyan_mobile_js';
        script.src = 'https://cy-cdn.kuaizhan.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf;
        head.appendChild(script);
    } else { var loadJs=function(d,a){var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;var b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("charset","UTF-8");b.setAttribute("src",d);if(typeof a==="function"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e==="loaded"||e==="complete"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs("https://cy-cdn.kuaizhan.com/upload/changyan.js",function(){window.changyan.api.config({appid:appid,conf:conf})}); } })();
