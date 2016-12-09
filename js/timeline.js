var timeline;

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
    zoomMax: 1000 * 60 * 60 * 24 * 365 * 1000,
    zoomMin: 1000 * 60 * 60 * 24 * 365,
    height: 200,
    clickToUse: true
  };
  $.getJSON( "../data/pamiatky.json", function( json ) {

      $.each( json.pamiatky, function( key, pam ) {
        if(pam.rokVzniku.match(/[0-9]{4}/)){
          rok = parseInt(pam.rokVzniku);
        }else {
          rok = (100 * parseInt(pam.rokVzniku)) - 50;
        }
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
  timeline = new vis.Timeline(container, items, options);
  timeline.fit();

  timeline.on('select', function (properties) {
        focusOnMap(properties.items[0]);
      });
}

window.onload = initializeTime;

function focusOnDate(id) {
  if(timeline)
    timeline.setSelection(id, {focus: focus.checked});
}
