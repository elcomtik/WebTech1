function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkVisitsCookie() {
    var visit = getCookie("visitCount");
    if(visit == "")
      visit = 0;
    visit++;
    setCookie("visitCount", visit, 30);

    document.getElementById('counter').innerHTML = "Počet zbrazení: " + visit ;
}

//window.onload = checkVisitsCookie();

function checkTangramScore(){
  var tangramScore = getCookie('tangramScore');
  if (tangramScore == "")
    tangramScore = 0;
    console.log(tangramScore);
  var points = parseInt(getPointsTangram());
  console.log(points);
  if(parseInt(points) > parseInt(tangramScore)){
    console.log('if');
    tangramScore = points;
    setCookie('tangramScore', tangramScore, 30);
  }
  return tangramScore;
}
