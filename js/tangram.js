var getPoints;
function initializeTangram(){
       $('.stuff').draggable({
           containment:'window',
           stack: '.stuff',
           snap: true,
           snapMode: 'outer',
           snapTolerance: 10,
           grid: [ 25, 25 ],
           stop:handleDrop,
        });

        var startT= new Date();
        var timePlayed;
        var maxPoints = 100000;
        var angle = 90;


        document.getElementById('score').innerHTML =   checkTangramScore();


        function handleDrop(e,ui){
          leftPlayfield = document.getElementById('playfield').offsetLeft;
          topPlayfield = document.getElementById('playfield').offsetTop;
          if(check1()
            || check2()
            || check3()
            || check4()){
            timePlayed = (new Date() - startT) / 1000;
            getPoints = parseInt(maxPoints/timePlayed);
            document.getElementById('score').innerHTML =   checkTangramScore();
              swal("Gratulujem!", "Podarilo sa vám vyskladať Tangram, hrali ste "+ timePlayed +
              "s a získali " + getPoints + " bodov.", "success");
            startT = new Date();
            }
        }
        function check1(){
          /*console.log(leftPlayfield,topPlayfield);
          console.log('tr1:'+$('#tri1').offset().left+', '+$('#tri1').offset().top + ', ' +getRotation($('#tri1')));
          console.log('tr2:'+$('#tri2').offset().left+', '+$('#tri2').offset().top + ', ' +getRotation($('#tri2')));
          console.log('tr3:'+$('#tri3').offset().left+', '+$('#tri3').offset().top + ', ' +getRotation($('#tri3')));
          console.log('tr4:'+$('#tri4').offset().left+', '+$('#tri4').offset().top + ', ' +getRotation($('#tri4')));
          console.log('tr5:'+$('#tri5').offset().left+', '+$('#tri5').offset().top + ', ' +getRotation($('#tri5')));
          console.log('square:'+$('#square').offset().left+', '+$('#square').offset().top + ', ' +getRotation($('#square')));
          console.log('rhombus:'+$('#rhombus').offset().left+', '+$('#rhombus').offset().top + ', ' +getRotation($('#rhombus')));
*/
          if($('#tri1').offset().left - leftPlayfield - 250.25 +
            $('#tri1').offset().top - topPlayfield - 322 +
            getRotation($('#tri1')) >= 2){
              //console.log('tri1');
               return false;
             }
          if($('#tri2').offset().left - leftPlayfield - 0.25 +
            $('#tri2').offset().top - topPlayfield - 72 +
            getRotation($('#tri2')) >= 2 &&
            $('#tri2').offset().left - leftPlayfield - 0.25 +
              $('#tri2').offset().top - topPlayfield - 72 +
              getRotation($('#tri2')) - 90 >= 2){
                //console.log('tri2');
                 return false;
               }
          if($('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 72 +
            getRotation($('#tri4')) >= 2 &&
            $('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 72 +
            getRotation($('#tri4')) - 90 >= 2){
              //console.log('tri4');
               return false;
             }

          if($('#tri3').offset().left - leftPlayfield - 375 +
            $('#tri3').offset().top - topPlayfield - 72 +
            getRotation($('#tri3')) >= 2 &&
            $('#tri3').offset().left - leftPlayfield - 125.25 +
            $('#tri3').offset().top - topPlayfield - 322 +
            getRotation($('#tri3')) - 90 >= 2){
              //console.log('tri3');
               return false;
             }

          if($('#tri5').offset().left - leftPlayfield - 375 +
            $('#tri5').offset().top - topPlayfield - 72 +
            getRotation($('#tri5')) >= 2 &&
            $('#tri5').offset().left - leftPlayfield - 125.25 +
            $('#tri5').offset().top - topPlayfield - 322 +
            getRotation($('#tri5')) - 90 >= 2){
              //console.log('tri5');
               return false;
             }

          if($('#square').offset().left - leftPlayfield -250.25 +
            $('#square').offset().top - topPlayfield - 72 >= 2){
              //console.log('square');
               return false;
             }

          if($('#rhombus').offset().left - leftPlayfield - 0.25 +
            $('#rhombus').offset().top - topPlayfield - 447 >= 2){
              //console.log('rh');
               return false;
             }
          return true;

        }

        function check2(){

          if($('#tri1').offset().left - leftPlayfield - 250.25 +
            $('#tri1').offset().top - topPlayfield - 72.27 +
            getRotation($('#tri1')) - 270 >= 2){
              //console.log('tri1');
               return false;
             }
          if($('#tri2').offset().left - leftPlayfield - 0.25 +
            $('#tri2').offset().top - topPlayfield - 72 +
            getRotation($('#tri2')) >= 2 &&
            $('#tri2').offset().left - leftPlayfield - 0.25 +
              $('#tri2').offset().top - topPlayfield - 322 +
              getRotation($('#tri2')) - 270 >= 2){
                //console.log('tri2');
                 return false;
               }
          if($('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 72 +
            getRotation($('#tri4')) >= 2 &&
            $('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 322 +
            getRotation($('#tri4')) - 270 >= 2){
              //console.log('tri4');
               return false;
             }

          if($('#tri3').offset().left - leftPlayfield - 0.25 +
            $('#tri3').offset().top - topPlayfield - 72 +
            getRotation($('#tri3')) -270 >= 2 &&
            $('#tri3').offset().left - leftPlayfield - 250.25 +
            $('#tri3').offset().top - topPlayfield - 197 +
            getRotation($('#tri3')) >= 2){
              //console.log('tri3');
               return false;
             }

          if($('#tri5').offset().left - leftPlayfield - 0.25 +
            $('#tri5').offset().top - topPlayfield - 72 +
            getRotation($('#tri5')) - 270 >= 2 &&
            $('#tri5').offset().left - leftPlayfield - 250.25 +
            $('#tri5').offset().top - topPlayfield - 197 +
            getRotation($('#tri5')) >= 2){
              //console.log('tri5');
               return false;
             }

          if($('#square').offset().left - leftPlayfield -125.25 +
            $('#square').offset().top - topPlayfield +53 >= 2){
              //console.log('square');
               return false;
             }

          if($('#rhombus').offset().left - leftPlayfield - 375.25 +
            $('#rhombus').offset().top - topPlayfield - 197 +
            getRotation($('#rhombus')) - 90>= 2){
              //console.log('rh');
               return false;
             }
          return true;

        }

        function check3(){

          if($('#tri1').offset().left - leftPlayfield - 0.25 +
            $('#tri1').offset().top - topPlayfield - 72 +
            getRotation($('#tri1')) - 180 >= 2){
              //console.log('tri1');
               return false;
             }
          if($('#tri2').offset().left - leftPlayfield - 250.25 +
            $('#tri2').offset().top - topPlayfield - 72 +
            getRotation($('#tri2')) - 180>= 2 &&
            $('#tri2').offset().left - leftPlayfield - 0.25 +
              $('#tri2').offset().top - topPlayfield - 370 +
              getRotation($('#tri2')) - 270 >= 2){
                //console.log('tri2');
                 return false;
               }
          if($('#tri4').offset().left - leftPlayfield - 250.25 +
            $('#tri4').offset().top - topPlayfield - 72 +
            getRotation($('#tri4')) - 180 >= 2 &&
            $('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 370 +
            getRotation($('#tri4')) - 270 >= 2){
              //console.log('tri4');
               return false;
             }

          if($('#tri3').offset().left - leftPlayfield - 125.25 +
            $('#tri3').offset().top - topPlayfield - 197 +
            getRotation($('#tri3')) -270 >= 2 &&
            $('#tri3').offset().left - leftPlayfield - 0.25 +
            $('#tri3').offset().top - topPlayfield - 322 +
            getRotation($('#tri3')) -180 >= 2){
              //console.log('tri3');
               return false;
             }

          if($('#tri5').offset().left - leftPlayfield - 125.25 +
            $('#tri5').offset().top - topPlayfield - 197 +
            getRotation($('#tri5')) - 270 >= 2 &&
            $('#tri5').offset().left - leftPlayfield - 0.25 +
            $('#tri5').offset().top - topPlayfield - 322 +
            getRotation($('#tri5')) -180 >= 2){
              //console.log('tri5');
               return false;
             }

          if($('#square').offset().left - leftPlayfield - 0.25 +
            $('#square').offset().top - topPlayfield - 72 >= 2){
              //console.log('square');
               return false;
             }

          if($('#rhombus').offset().left - leftPlayfield - 125.25 +
            $('#rhombus').offset().top - topPlayfield - 72 +
            getRotation($('#rhombus')) - 0>= 2){
              //console.log('rh');
               return false;
             }
          return true;

        }

        function check4(){

          if($('#tri1').offset().left - leftPlayfield - 0.25 +
            $('#tri1').offset().top - topPlayfield - 250 +
            getRotation($('#tri1')) - 90 >= 2){
              //console.log('tri1');
               return false;
             }
          if($('#tri2').offset().left - leftPlayfield - 250.25 +
            $('#tri2').offset().top - topPlayfield - 0 +
            getRotation($('#tri2')) - 180>= 2 &&
            $('#tri2').offset().left - leftPlayfield - 0.25 +
              $('#tri2').offset().top - topPlayfield -0 +
              getRotation($('#tri2')) - 90 >= 2){
                //console.log('tri2');
                 return false;
               }
          if($('#tri4').offset().left - leftPlayfield - 250.25 +
            $('#tri4').offset().top - topPlayfield -0 +
            getRotation($('#tri4')) - 180 >= 2 &&
            $('#tri4').offset().left - leftPlayfield - 0.25 +
            $('#tri4').offset().top - topPlayfield - 0 +
            getRotation($('#tri4')) - 90 >= 2){
              //console.log('tri4');
               return false;
             }

          if($('#tri3').offset().left - leftPlayfield - 125.25 +
            $('#tri3').offset().top - topPlayfield - 125 +
            getRotation($('#tri3')) -180 >= 2 &&
            $('#tri3').offset().left - leftPlayfield - 250 +
            $('#tri3').offset().top - topPlayfield - 375 +
            getRotation($('#tri3')) -90 >= 2){
              //console.log('tri3');
               return false;
             }

          if($('#tri5').offset().left - leftPlayfield - 125.25 +
            $('#tri5').offset().top - topPlayfield - 125 +
            getRotation($('#tri5')) - 180 >= 2 &&
            $('#tri5').offset().left - leftPlayfield -250 +
            $('#tri5').offset().top - topPlayfield - 375 +
            getRotation($('#tri5')) -90 >= 2){
              //console.log('tri5');
               return false;
             }

          if($('#square').offset().left - leftPlayfield - 125.296 +
            $('#square').offset().top - topPlayfield - 125 >= 2){
              //console.log('square');
               return false;
             }

          if($('#rhombus').offset().left - leftPlayfield - 0.25+
            $('#rhombus').offset().top - topPlayfield +
            getRotation($('#rhombus')) - 270 >= 2){
              //console.log('rh');
               return false;
             }
          return true;

        }




        function getRotation(obj) {
            var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform")    ||
            obj.css("-ms-transform")     ||
            obj.css("-o-transform")      ||
            obj.css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }
            return (angle < 0) ? angle + 360 : angle;
        }


       $('#rhombus').click(function() {
        $(this).css ({
               '-webkit-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                  '-moz-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                    '-o-transform': 'rotate(' + angle + 'deg) skew(-45deg)',
                   '-ms-transform': 'rotate(' + angle + 'deg)'
        });
        angle+=90;
      });

      $('#square').click(function() {
        angle+=90;
     });

     $('.tri').click(function() {
       $(this).css ({
           '-webkit-transform': 'rotate(' + angle + 'deg)',
              '-moz-transform': 'rotate(' + angle + 'deg)',
                '-o-transform': 'rotate(' + angle + 'deg)',
               '-ms-transform': 'rotate(' + angle + 'deg)'
       });
       angle+=90;
    });


}

function getPointsTangram() {
  return getPoints;
}

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
