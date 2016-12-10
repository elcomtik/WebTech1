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

//nacitame source data k hre z ext. JSON suboru
var data;
$.getJSON("../data/vynalezcovia.json", function(json) {
    data = json;
    console.log(data);
});

function pickRandomQuestion(qArray) {

    return qArray[Math.floor(Math.random() * qArray.length)];
}

function hraj() {
    $('#gameCanvas').clearCanvas();

    console.log(data.odpovede);
    var q = pickRandomQuestion(data.vynalezcovia);
    console.log(q);
    vykresliOtazku(q);
}


function vykresliOtazku(q) {

    canvas.drawRect({
        layer: true,
        name: "inventor",
        strokeStyle: 'black',
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
    })

    canvas.drawArc({
        layer: true,
        fillStyle: 'black',
        x: 100, y: 100,
        radius: 50,
        draggable: true,
        dragstop: function() {
            var result = console.log($('canvas').getLayer("inventor").intersects);
            if (result == true){
                spravna();
            }
            else{
                nespravna();
            }
        }
    });
}

function spravna() {
    
}

function nespravna() {

}

