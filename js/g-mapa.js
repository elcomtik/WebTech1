/**
 * Created by rdanko on 07.12.2016.
 */

var map, infowindow;
var markersData = [];

function initializeMap() {
    //vytvorime mapu
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(48.74, 19.68),
        zoom: 8
    };

    map = new google.maps.Map(mapCanvas, mapOptions);
    var id = 0;
    //vykresli markery pre pamiatky z ext. JSON suboru. Realizovane pomocou jQuery funkcie
    $.getJSON( "../data/pamiatky.json", function( json ) {

        $.each( json.pamiatky, function( key, pam ) {

            //console.log(pam.nazov);
            var pos = new google.maps.LatLng(pam.sirka,pam.dlzka);
            markersData[id] = new google.maps.Marker({
                position: pos,
                map: map,
                title: pam.nazov + "\nVznik: " + pam.rokVzniku
            });
            markersData[id].setMap(map);
            markersData[id].addListener('click', function(){
              focusOnDate(markersData.indexOf(this)+1);
            })
            id++;
        });
    });
}

google.maps.event.addDomListener(window, "load", initializeMap);

function focusOnMap(id) {
  map.setZoom(14);
  map.setCenter(markersData[id-1].getPosition());
}
