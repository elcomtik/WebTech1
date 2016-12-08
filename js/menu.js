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
    pHistory.items.push({href:  window.location.pathname, title: document.title});

    if(pHistory.items.length > 4 ){
        pHistory.items.shift();
    }
    $.cookie("pHistory", pHistory, { expires: 1, path: '/' });

    document.getElementById("breadcrumb").innerHTML = bc;
}

function generuj_menu() {
    var level1 = [
        {name : "Úvod", typ:0, ref:"/index.html"},
        {name : "Technické pamiatky", typ:1, ref:""},
        {name : "Mapa", typ:0, ref:"/html/g-mapa.html"},
        {name : "Kalendár", typ:0, ref:"/html/meniny.html"},
        {name : "Pripomienkovač", typ:0, ref:"/html/reminder.html"},
        {name : "Hry", typ:1, ref:""},
        {name : "Autori", typ:1, ref:""}];

    var autori = [
        {name:"Roman Danko", typ:1, ref:""},
        {name:"Adam Podhradský", typ:1, ref:""},
        {name:"Erik Pribula", typ:1, ref:""},
        {name:"Lukáš Šníder", typ:1, ref:""},
        {name:"Martin Meľuch", typ:1, ref:""}];
    var pamiaty = [
        {name:"Železiareň Františková Huta", typ:0, ref:"", autor:"Roman Danko"},
        {name:"Kysucko-Oravská lesná úvraťová železnica", typ:0, ref:"", autor:"Roman Danko"},
        {name:"Čiernohronská železnica", typ:0, ref:"", autor:"Adam Podhradský"},
        {name:"Vysutá lanová dráha", typ:0, ref:"", autor:"Adam Podhradský"},
        {name:"Gápeľ-Solivar Prešov", typ:0, ref:"", autor:"Erik Pribula"},
        {name:"Hvezdáreň Prešov", typ:0, ref:"", autor:"Erik Pribula"},
        {name:"Zvolenský hrad", typ:0, ref:"/html/pamiatky-ls.html", autor:"Lukáš Šníder"},
        {name:"Štôlňa-Banská Štiavnica", typ:0, ref:"/html/pamiatky-ls.html", autor:"Lukáš Šníder"},
        {name:"Jazero mieru", typ:0, ref:"", autor:"Martin Meľuch"},
        {name:"Slávikov mlyn", typ:0, ref:"", autor:"Martin Meľuch"},
    ];
    var hry = [
        {name:"Čínske šachy", typ:0, ref:"", autor:"Roman Danko"},
        {name:"Čísla", typ:0, ref:"", autor:"Adam Podhradský"},
        {name:"Hanojské veže", typ:0, ref:"",autor:"Erik Pribula"},
        {name:"Zemepisné puzzle", typ:0, ref:"", autor:"Lukáš Šníder"},
        {name:"Sudoku", typ:0, ref:"", autor:"Martin Meľuch"},
    ];

    var navbar = document.getElementById("navbar");
    navbar.className+="navbar navbar-default";
    navbar.innerHTML+='<div class="container-fluid" id="container"></div>';
    var container = document.getElementById("container");
    container.innerHTML+= "<div id='nav_header'> </div>";
    var navheader = document.getElementById('nav_header');
    navheader.innerHTML+='<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"></button>';
    navheader.innerHTML+='<a class="navbar-brand" href="#">WebTech</a>';
    container.innerHTML+='<div class="collapse navbar-collapse" id="container_list"></div>';
    var container_list = document.getElementById("container_list");
    container_list.innerHTML+='<ul class="nav navbar-nav" id="list"></ul>';
    var list = document.getElementById("list");
    var i=0,j,k,p=100;
    var list_tmp1;
    var list_tmp2;
    var list_tmp3;
    var list_tmp4;
    for(i=0;i<level1.length;i++)
    {
        if (level1[i].typ==0)
        {
            list.innerHTML+='<li><a href="'+webroot+level1[i].ref+'">'+level1[i].name+' <span class="sr-only"></span></a></li>';
        }
        else
        {
            p++;
            list.innerHTML+='<li class="dropdown" id="'+p+'"></li>';
            list_tmp1 = document.getElementById(p);
            list_tmp1.innerHTML+='<a href="'+webroot+level1[i].ref+'" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+level1[i].name+' <span class="caret"></span></a>';
            p++;
            list_tmp1.innerHTML+='<ul class="dropdown-menu" id="'+p+'"></ul>';
            list_tmp2 = document.getElementById(p);
            if (level1[i].name=="Technické pamiatky")
            {
                for (j=0;j<autori.length;j++)
                {
                    p++;
                    list_tmp2.innerHTML+='<li class="dropdown-submenu" id="'+p+'">';
                    list_tmp3 = document.getElementById(p);
                    list_tmp3.innerHTML+='<a class="test" tabindex="-1" href="#">'+autori[j].name+' <span class="caret-right"></span></a>';
                    p++;
                    list_tmp3.innerHTML+='<ul class="dropdown-menu" id="'+p+'"></ul>';
                    list_tmp4 = document.getElementById(p);
                    for(k=0;k<pamiaty.length;k++)
                        if (pamiaty[k].autor==autori[j].name)
                        {
                            list_tmp4.innerHTML+='<li><a tabindex="-1" href="'+webroot+pamiaty[k].ref+'">'+pamiaty[k].name+' </a></li>';
                        }
                }
            }
            if (level1[i].name=="Hry")
            {
                for(j=0;j<hry.length;j++)
                {
                    list_tmp2.innerHTML+=' <li><a tabindex="-1" href="'+webroot+hry[j].ref+'">'+hry[j].name+' </a></li>';
                }
            }
            if (level1[i].name=="Autori")
            {
                for(j=0;j<autori.length;j++)
                {
                    p++;
                    list_tmp2.innerHTML+='<li class="dropdown-submenu" id="'+p+'">';
                    list_tmp3 = document.getElementById(p);
                    list_tmp3.innerHTML+='<a class="test" tabindex="-1" href="#">'+autori[j].name+' <span class="caret-right"></span></a>';
                    p++;
                    list_tmp3.innerHTML+='<ul class="dropdown-menu" id="'+p+'"></ul>';
                    list_tmp4 = document.getElementById(p);
                    for(k=0;k<pamiaty.length;k++)
                    {
                        if (pamiaty[k].autor==autori[j].name)
                        {
                            list_tmp4.innerHTML+='<li><a tabindex="-1" href="'+webroot+pamiaty[k].ref+'">'+pamiaty[k].name+' </a></li>';
                        }
                    }
                    for(k=0;k<hry.length;k++)
                    {
                        if (hry[k].autor==autori[j].name)
                            list_tmp4.innerHTML+=' <li><a tabindex="-1" href="'+webroot+hry[k].ref+'">'+hry[k].name+' </a></li>';
                    }
                }

            }
        }
    }

    generate_breadcrumbs();
}

