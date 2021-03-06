var webroot = ""; //treba zmenit podla hostingu, na ktory sa nasadzuje aplikacia

$.cookie.json = true;

function generate_breadcrumbs() {

    //console.log(pHistory.toString());

    var pHistory = $.cookie("pHistory");
    if(pHistory === undefined){
        pHistory = {items: []};
    }
    var bc = "";
    //console.log(pHistory);

    $.each( pHistory.items, function( key, value ) {
        bc += "<li><a href='" + value.href + "'>" + value.title + "</a></li>";

    });

    bc += "<li class='active'>" + document.title + "</li>";
    pHistory.items.push({href: window.location.pathname, title: document.title});

    if (pHistory.items.length > 4) {
        pHistory.items.shift();
    }
    $.cookie("pHistory", pHistory, {expires: 1, path: '/'});

    document.getElementById("breadcrumb").innerHTML = bc;
}

function generuj_menu() {
    var level1 = [
        {name: "Úvod", typ: 0, ref: "/index.html"},
        {name: "Technické pamiatky", typ: 0, ref: "/html/pamiatky.html"},
        {name: "Mapy", typ: 1, ref: ""},
        {name: "Kalendár", typ: 0, ref: "/html/meniny.html"},
        {name: "Pripomienkovač", typ: 0, ref: "/html/reminder.html"},
        {name: "Hry", typ: 1, ref: ""},
        {name: "Autori", typ: 1, ref: ""},
        {name: "Rozdelenie úloh", typ: 0, ref: "/html/jobs.html"}];

    var mapy = [
        {name: "Google", typ: 0, ref: "/html/g-mapa.html"},
        {name: "Obrázok", typ: 0, ref: "/html/n-mapa.html"}
    ];

    var autori = [
        {name: "Roman Danko", typ: 1, ref: ""},
        {name: "Adam Podhradský", typ: 1, ref: ""},
        {name: "Erik Pribula", typ: 1, ref: ""},
        {name: "Lukáš Šníder", typ: 1, ref: ""},
        {name: "Martin Meľuch", typ: 1, ref: ""}];
    var pamiaty = [
        {name: "Železiareň Františková Huta", typ: 0, ref: "/html/pamiatky.html#pam_roman", autor: "Roman Danko"},
        {name: "Kysucko-Oravská lesná úvraťová železnica", typ: 0, ref: "/html/pamiatky.html#pam_roman", autor: "Roman Danko"},
        {name: "Čiernohronská železnica", typ: 0, ref: "/html/pamiatky.html#pam_adam", autor: "Adam Podhradský"},
        {name: "Vysutá lanová dráha", typ: 0, ref: "/html/pamiatky.html#pam_adam", autor: "Adam Podhradský"},
        {name: "Gápeľ-Solivar Prešov", typ: 0, ref: "/html/pamiatky.html#pam_erik", autor: "Erik Pribula"},
        {name: "Parná elektráreň Žilina", typ: 0, ref: "/html/pamiatky.html#pam_erik", autor: "Erik Pribula"},
        {name: "Zvolenský hrad", typ: 0, ref: "/html/pamiatky.html#pam_lukas", autor: "Lukáš Šníder"},
        {name: "Štôlňa-Banská Štiavnica", typ: 0, ref: "/html/pamiatky.html#pam_lukas", autor: "Lukáš Šníder"},
        {name: "Jazero mieru", typ: 0, ref: "/html/pamiatky.html#pam_martin", autor: "Martin Meľuch"},
        {name: "Slávikov mlyn", typ: 0, ref: "/html/pamiatky.html#pam_martin", autor: "Martin Meľuch"},
    ];
    var hry = [
        {name:"Priraď vynález", typ:0, ref:"/html/vynalezcovia.html", autor:"Roman Danko"},
        {name:"Čísla", typ:0, ref:"/html/numbers.html", autor:"Adam Podhradský"},
        {name:"Hanojské veže", typ:0, ref:"/html/veze.html",autor:"Erik Pribula"},
        {name:"Zemepisné puzzle", typ:0, ref:"/html/geopuzzle.html", autor:"Lukáš Šníder"},
        {name:"Tangram", typ:0, ref:"/html/tangram.html", autor:"Martin Meľuch"},
    ];


    var navbar = document.getElementById("navbar");
    navbar.className += "navbar navbar-inverse";
    navbar.innerHTML += '<div class="container-fluid" id="container"></div>';
    var container = document.getElementById("container");
    container.innerHTML += "<div class='navbar-header' id='nav_header'> </div>";
    var navheader = document.getElementById('nav_header');
    navheader.innerHTML += '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#container_list" aria-expanded="false"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#">Webtech</a>';
    container.innerHTML += '<div class="collapse navbar-collapse" id="container_list"></div>';
    var container_list = document.getElementById("container_list");
    container_list.innerHTML += '<ul class="nav navbar-nav" id="list"></ul>';
    var list = document.getElementById("list");
    var i = 0, j, k, p = 100;
    var list_tmp1;
    var list_tmp2;
    var list_tmp3;
    var list_tmp4;
    for (i = 0; i < level1.length; i++) {
        if (level1[i].typ == 0) {
            list.innerHTML += '<li><a href="' + webroot + level1[i].ref + '">' + level1[i].name + ' <span class="sr-only"></span></a></li>';
        }
        else {
            p++;
            list.innerHTML += '<li class="dropdown" id="' + p + '"></li>';
            list_tmp1 = document.getElementById(p);
            list_tmp1.innerHTML += '<a href="' + webroot + level1[i].ref + '" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + level1[i].name + ' <span class="caret"></span></a>';
            p++;
            list_tmp1.innerHTML += '<ul class="dropdown-menu" id="' + p + '"></ul>';
            list_tmp2 = document.getElementById(p);
            if (level1[i].name == "Mapy") {
                for (j = 0; j < mapy.length; j++) {
                    list_tmp2.innerHTML += ' <li><a tabindex="-1" href="' + webroot + mapy[j].ref + '">' + mapy[j].name + ' </a></li>';
                }
            }
            if (level1[i].name == "Hry") {
                for (j = 0; j < hry.length; j++) {
                    list_tmp2.innerHTML += ' <li><a tabindex="-1" href="' + webroot + hry[j].ref + '">' + hry[j].name + ' </a></li>';
                }
            }
            if (level1[i].name == "Autori") {
                for (j = 0; j < autori.length; j++) {
                    p++;
                    list_tmp2.innerHTML += '<li class="dropdown-submenu" id="' + p + '">';
                    list_tmp3 = document.getElementById(p);
                    list_tmp3.innerHTML += '<a class="test" tabindex="-1" href="#">' + autori[j].name + ' <span class="caret-right"></span></a>';
                    p++;
                    list_tmp3.innerHTML += '<ul class="dropdown-menu" id="' + p + '"></ul>';
                    list_tmp4 = document.getElementById(p);
                    for (k = 0; k < pamiaty.length; k++) {
                        if (pamiaty[k].autor == autori[j].name) {
                            list_tmp4.innerHTML += '<li><a tabindex="-1" href="' + webroot + pamiaty[k].ref + '">' + pamiaty[k].name + ' </a></li>';
                        }
                    }
                    for (k = 0; k < hry.length; k++) {
                        if (hry[k].autor == autori[j].name)
                            list_tmp4.innerHTML += ' <li><a tabindex="-1" href="' + webroot + hry[k].ref + '">' + hry[k].name + ' </a></li>';
                    }
                }

            }
        }
    }

    generate_breadcrumbs();
    generate_popups();
}

function generate_popups() {

        $('.dropdown-submenu a.test').on("click", function(e){
            $(this).next('ul').toggle();
            e.stopPropagation();
            e.preventDefault();
        });
}
