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
$.getJSON("../data/vynalezcovia.json", function(json) {
    data = json;
    console.log(data);
});

function pickRandomQuestion(qArray) {

    return qArray[Math.floor(Math.random() * qArray.length)];
}

function novaOtazka() {
    console.log(data.odpovede);
    var q = pickRandomQuestion(data.vynalezcovia);
    console.log(q);
    vykresliOtazku(q);
    hra += 1;
}

function hraj() {
    if(hra == 0){

        //inicializujem hernu plochu
        canvas.clearCanvas();
        $("#actual").html(actual);
        $("#highest").html(highest);

        //vyberieme prvu otazku
        novaOtazka();
    }
    else{
        alert("Máš rozohranú hru, ak si praješ ");
    }
}

function koniecHry() {
    canvas.clearCanvas().drawText({
        layer: true,
        x: 400, y: 200,
        fillStyle: '#36c',
        fontSize: 36,
        fontFamily: 'Verdana, sans-serif',
        text: "Kniec Hry, tvoje skóre je: " + actual,
    })
}

function vykresliOtazku(q) {

    canvas.drawRect({
        layer: true,
        name: "inventor",
        //strokeStyle: 'black',
        //strokeWidth: 1,
        x: 400, y: 300,
        width: 400, height: 220,
        sides: 4
    }).drawImage({
        layer: true,
        source: imgPath + q.fotka,
        x: 400, y: 300,
        scale: 0.5,
    }).drawText({
        layer: true,
        x: 400, y: 380,
        fillStyle: '#36c',
        fontSize: 14,
        fontFamily: 'Verdana, sans-serif',
        text: q.meno,
    });

    canvas.drawArc({
        layer: true,
        fillStyle: 'black',
        x: 100, y: 100,
        radius: 50,
        draggable: true,
        dragstop: function() {
            var result = $('canvas').getLayer("inventor").intersects;
            if (result == true){
                //vypise hlasku spravna odpoved, iniciuje zobrazenie dalsej otazky
                spravna();
            }
            else{
                //zmaze danu moznost, odpocita dva body
                nespravna();
            }
        }
    });
}

function spravna() {
    actual += 1;
    $("#actual").html(actual);

    //dalsia otakza
    if(hra < pocetOtazok){
        novaOtazka();
    }
    else{
        koniecHry();
    }
}

function nespravna() {
    actual -= 2;
    $("#actual").html(actual);
}

