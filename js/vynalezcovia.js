/**
 * Created by rdanko on 10.12.2016.
 */

/* udaje o vynalezcoch som cerpal z:
 * https://sk.wikipedia.org/wiki/Kateg%C3%B3ria:Slovensk%C3%AD_vyn%C3%A1lezcovia
 * http://fici.sme.sk/c/20063143/tychto-8-zasadnych-vynalezov-dali-slovaci-svetu-niektore-mozno-nepoznate.html
 *
 * mapovanie medzi vynalezmi a vynalezcami je v data/vynalezcovia.json
 */

var imgPath = "../images/vynalezcovia/"
var canvas = $('#gameCanvas');
var startButton = $("#restart");
var hra = 0;
var actual = 0;
var pocetOtazok = 5;


var highest = $.cookie("inv_highest");
if (highest === undefined) {
    highest = 0;
    $.cookie("inv_highest", highest);
}

$("#actual").html(actual);
$("#highest").html(highest);

//nacitame source data k hre z ext. JSON suboru
var data;
$.getJSON("../data/vynalezcovia.json", function (json) {
    data = json;
});

function genRandPositions() {

    var positions = [100, 300, 500, 700];
    var result = [];

    for (i=0; i<4; i++){
        var p = (Math.floor(Math.random() * (4-i)));
        result.push(positions[p]);
        positions.splice(p,1);
    }

    return result;
}

function pickRandomQuestion(qArray) {

    return qArray[Math.floor(Math.random() * qArray.length)];
}

function novaOtazka() {

    var q = pickRandomQuestion(data.vynalezcovia);
    vykresliOtazku(q);
    hra += 1;
}

function hraj() {

    if (hra == 0) {
        //inicializujem hernu plochu
        canvas.removeLayers();
        canvas.clearCanvas();
        actual = 0;
        $("#actual").html(actual);
        $("#highest").html(highest);
        startButton.css('display','none');

        //vyberieme prvu otazku
        novaOtazka();
    }
    else {
        alert("Máš rozohranú hru, ak si tak praješ, stlač reštart ");
        startButton.css('display','inline');

        setTimeout(function () {
            startButton.css('display','none');
        }, 5000);
    }
}

function restart() {


    //inicializujem hernu plochu
    canvas.removeLayers();
    canvas.clearCanvas();
    actual = 0;
    $("#actual").html(actual);
    $("#highest").html(highest);
    startButton.css('display','none');

    //vyberieme prvu otazku
    novaOtazka();
}

function koniecHry() {

    //vypise hlasku
    canvas.removeLayers();
    canvas.clearCanvas().drawText({
        layer: true,
        x: 400, y: 200,
        fillStyle: '#36c',
        fontSize: 36,
        fontFamily: 'Verdana, sans-serif',
        text: "Koniec Hry, tvoje skóre je: " + actual,
    })

    //ak je skore dotera znajvyssie ulozi ho do cookie
    if (actual > highest) {
        highest = actual;
        $.cookie("inv_highest", highest);
    }

    //premaze pocet vyroiesenych uloh
    hra = 0;
}


function vykresliOtazku(q) {

    //zakazdym vycistim hernu plochu
    canvas.removeLayers();
    canvas.clearCanvas();

    //vykreslim vynalezcu
    canvas.drawRect({
        layer: true,
        name: "inventor",
        x: 400, y: 300,
        width: 300, height: 220,
        sides: 4
    }).drawImage({
        layer: true,
        source: imgPath + q.fotka,
        x: 400, y: 300,
        scale: 0.5
    }).drawText({
        layer: true,
        x: 400, y: 380,
        fillStyle: '#36c',
        fontSize: 14,
        fontFamily: 'Verdana, sans-serif',
        text: q.meno
    });

    //vykreslim vsetky mozne odpovede-obrazky
    var pos = genRandPositions();
    index = 0;
    match = false;
    $.each(data.vynalezy, function (key, v) {

        if(data.odpovede[q.meno] == v.nazov){
            match = true;
        }

        if((match == true) && (index < 4)){
            canvas.drawImage({
                layer: true,
                groups: [v.nazov],
                draggable: true,
                dragGroups: [v.nazov],
                source: imgPath + v.obrazok,
                x: pos[index], y: 100,
                scale: 1,

                dragstop: function () {
                    var result = $('canvas').getLayer("inventor").intersects;

                    if ((result == true) && (data.odpovede[q.meno] == v.nazov)) {
                        //vypise hlasku spravna odpoved, iniciuje zobrazenie dalsej otazky
                        spravna();
                    }
                    else if (result == true) {
                        //zmaze danu moznost, odpocita dva body
                        canvas.removeLayerGroup(v.nazov);
                        nespravna();
                    }
                }
            }).drawText({
                layer: true,
                groups: [v.nazov],
                draggable: true,
                dragGroups: [v.nazov],
                x: pos[index], y: 170,
                fillStyle: '#36c',
                fontSize: 12,
                fontFamily: 'Verdana, sans-serif',
                text: v.nazov
            });

            index += 1;
        }
    });
}

function spravna() {

    //upravim bodove hodnotenie
    actual += 1;
    $("#actual").html(actual);

    //dalsia otakza
    if (hra < pocetOtazok) {
        novaOtazka();
    }
    else {
        koniecHry();
    }
}

function nespravna() {

    //upravim bodove hodnotenie
    actual -= 2;
    $("#actual").html(actual);
}

//vypisem privitaciu hlasku
$(window).ready(function () {

    console.log("ahoj");
    canvas.removeLayers();
    canvas.clearCanvas().drawText({
        layer: true,
        x: 400, y: 200,
        fillStyle: '#36c',
        fontSize: 36,
        fontFamily: 'Verdana, sans-serif',
        text: "Pre začiatok stlač tlačidlo štart!"
    });
});