/**
 * Created by rdanko on 07.12.2016.
 */

var map, infowindow;

function initializeMap() {
    //vytvorime mapu
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(48.74, 19.68),
        zoom: 8
    };

    map = new google.maps.Map(mapCanvas, mapOptions);

    //vykresli markery pre pamiatky z ext. JSON suboru. Realizovane pomocou jQuery funkcie
    $.getJSON( "../data/pamiatky.json", function( json ) {

        $.each( json.pamiatky, function( key, pam ) {

            console.log(pam.nazov);
            var pos = new google.maps.LatLng(pam.sirka,pam.dlzka);
            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: pam.nazov + "\nVznik: " + pam.rokVzniku
            });
            marker.setMap(map);
        });
    });
}

google.maps.event.addDomListener(window, "load", initializeMap);
