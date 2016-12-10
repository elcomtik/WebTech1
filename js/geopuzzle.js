
var polygons = [];
var successCount = 0;
var pieces = [];
var globPieceDiv = null;
var globScoreDiv = null;
var ALL_PUZZLE_PIECES = 8;
var startColor = 'blue';
var endColor =  'green';

var init = function(map) {
    this.map_ = map;
    this.createMenu_(map);
    this.loadPuzzleData();
};

var createMenu_ = function(map) {

      var menuDiv = document.createElement('div');
      menuDiv.style.height = '100%';
      menuDiv.style.width = '20%';
      menuDiv.style.backgroundColor = 'white';
      menuDiv.style.fontSize = '18px';
      menuDiv.style.textAlign = 'center';
      menuDiv.style.color = 'blue';

      var pieceTitleDiv = document.createElement('div');
      pieceTitleDiv.innerText = 'SKORE:';
      pieceTitleDiv.style.marginTop = '20%';
      pieceTitleDiv.className = "menu-item";

      var pieceDiv = globPieceDiv = document.createElement('div');
      pieceDiv.innerText = '0 z ' + ALL_PUZZLE_PIECES;
      pieceDiv.className = "menu-item";

      var resetDiv = document.createElement('div');
      resetDiv.innerText = 'Restart';
      resetDiv.className = "menu-item";
      resetDiv.style.color = "blue";
      resetDiv.onclick = resetGame.bind(this);

      var bestScoreDiv = document.createElement('div');
      bestScoreDiv.innerText = "Najvyššie skóre:";
      bestScoreDiv.className = "menu-item";

      var actualScoreDiv = globScoreDiv = document.createElement('div');
      actualScoreDiv.innerHTML = "Úlohou je nájsť regióny Slovenska a správne ich tvary, ktoré sú na mape náhodné umiestnené, priradiť k správnemu regiónu. Hra je úspešne ukončená ak nájdete všetky regióny.";
      actualScoreDiv.className = "menu-item";
      actualScoreDiv.style.height = '30%';

      menuDiv.appendChild(pieceTitleDiv);
      menuDiv.appendChild(pieceDiv);

      menuDiv.appendChild(resetDiv);
      menuDiv.appendChild(bestScoreDiv);
      menuDiv.appendChild(actualScoreDiv);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(menuDiv);
};

var loadPuzzleData = function() {
    var xmlhttpRequest = new XMLHttpRequest;
    xmlhttpRequest.onreadystatechange = function() {
        if (xmlhttpRequest.status != 200 || xmlhttpRequest.readyState != XMLHttpRequest.DONE)
            return;
        loadDataComplete(JSON.parse(xmlhttpRequest.responseText));
    }.bind(this);
    xmlhttpRequest.open('GET', '../data/slovakdata.json', true);
    xmlhttpRequest.send(null);
};

var loadDataComplete = function(data) {
    pieces = data;
    startPuzzle();
};

var resetGame = function() {
    if(successCount == ALL_PUZZLE_PIECES) {
        clearPuzzle();
        successCount = 0;
        printCountSolved();
        addPiecesRandomly();
    }
};

var printCountSolved = function() {

    globPieceDiv.innerText = successCount + ' z ' + ALL_PUZZLE_PIECES;
    // All the pieces have been found
    if (successCount == ALL_PUZZLE_PIECES) {
        var lastBest = Number(globScoreDiv.innerHTML);
        alert("Vyhrali ste túto hru!");
        /*if (lastBest != "")
            if (lastBest > globTimeDiv.innerHTML)
                globScoreDiv.innerHTML = globTimeDiv.innerHTML;
            else
                globScoreDiv.innerHTML = globTimeDiv.innerHTML;*/
    }
};

var addPiecesRandomly = function() {
    // Shuffle pieces
    var randLat  = Math.random() + 1.2;
    var randLng = Math.random() + 1.2;
    var regs = pieces;

    for (var i = 0; i < regs.length; i++) {
        if(i == 0) {
            randLat -= (Math.random() + 0.5);
            randLng -= (Math.random() + 1.0);
        }
        else if(i == 1) {
            randLat -= (Math.random() + 0.8);
            randLng += (Math.random() + 0.7);
        }
        else if(i == 2) {
            randLat += (Math.random() * 0.7);
            randLng += (Math.random());
        }
        else if(i == 3) {
            randLat += (Math.random() * 0.3);
            randLng += (Math.random());
        }
        else if(i == 4) {
            randLat += (Math.random() + 1.9);
            randLng += (Math.random() + 1.9);
        }
        else if(i == 5) {
            randLat -= (Math.random() * 0.7);
            randLng -= (Math.random());
        }
        else if(i == 6) {
            randLat += (Math.random() * 0.7);
            randLng += (Math.random());
        }
        else if(i == 7) {
            randLat += (Math.random() * 0.3);
            randLng += (Math.random());
        }
        addOne(regs[i], randLat, randLng);
    }
};

var addOne = function(reg, shuffleLat, shuffleLng) {

    var newpaths = new Array();
    var newpath = new Array();

    var coords = reg.coordinates[0][0];

    for (var i = 0; i < coords.length; i++) {
        newpath.push({
            lat: Number(coords[i][1] - shuffleLat),
            lng: Number(coords[i][0] - shuffleLng)
        });
    }
    newpaths.push(newpath);
    var options = {
        strokeColor: startColor,
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: startColor,
        fillOpacity: 0.35,
        geodesic: false,
        map: this.map_,
        draggable: true,
        zIndex: 2,
        paths: newpaths
    };
    var poly = new google.maps.Polygon(options);

    google.maps.event.addListener(poly, 'dragend', function() {
        checkpos(poly, reg);
        polygons.push(poly);
    }.bind(this));
};

var checkIfFound = function(bounds, poly) {
    var b = new google.maps.LatLngBounds(new google.maps.LatLng(bounds[0][0], bounds[0][1]), new google.maps.LatLng(bounds[1][0], bounds[1][1]));
    var paths = poly.getPaths().getArray();

    var p = paths[0].getArray();
    for (var i = 0; i < p.length; i++) {
        if (!b.contains(p[j])) {
            return false;
        }
    }
    return true;
};

var swapForGreen = function(poly, reg) {
    var newpaths = new Array();
    var newpath = new Array();
    var coords = reg.coordinates[0][0];

    for (var i = 0; i < coords.length; i++) {
        newpath.push({
            lat: Number(coords[i][1]),
            lng: Number(coords[i][0])
        });
    }
    newpaths.push(newpath);
    var options = {
        strokeColor: endColor,
        fillColor: endColor,
        draggable: false,
        zIndex: 1,
        paths: newpaths
    };

    poly.setOptions(options);
    successCount++;
    printCountSolved();
};

var checkpos = function(poly, country) {
    if (checkIfFound(country.bounds, poly)) {
        swapForGreen(poly, country);
    }
};

var startPuzzle = function() {
    clearPuzzle();
    successCount = 0;
    printCountSolved();
    addPiecesRandomly();
};

var clearPuzzle = function() {
    var poly = [];
    for (var i = 0; poly = polygons[i]; i++) {
        poly.setMap(null);
    }
    polygons = [];
};

window.initMap = function() {
    var map = new google.maps.Map(document.getElementById('map'), {
        disableDefaultUI: true,
        center: {lat: 48, lng: 19},
        zoom: 7
    });
    init(map);
};
