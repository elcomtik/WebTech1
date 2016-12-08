function initializeTime() {

  // DOM element where the Timeline will be attached
  var container = document.getElementById('timeline');

  var id = 1;

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet();
  var rok;
  var name;


  // Configuration for the Timeline
  var options = {
    min: new Date(1000,0,1),
    max: new Date(2016,0,1),
    type: 'point',
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 500,
    zoomMin: 1000 * 60 * 60 * 24 * 365,
    height: 200
  };
  $.getJSON( "../data/pamiatky.json", function( json ) {

      $.each( json.pamiatky, function( key, pam ) {
        if(pam.rokVzniku.match(/[0-9]{4}/)){
          rok = parseInt(pam.rokVzniku);
        }else {
          rok = (100 * parseInt(pam.rokVzniku)) - 50;
        }
        console.log(rok);
      items.add(
        {
          id: id,
          content: pam.nazov,
          start: new Date(rok, '0', '1')
        }
      )
      id++;
    });
  });

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
  timeline.fit();
}

window.onload = initializeTime;
