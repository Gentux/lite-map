'use strict';


var L = L || {};


window.addEventListener('load', function() {
  /* Basemap Layers */
  var attr_osm = '<span data-l10n-id="attr_osm">' +
    'Map data &copy; ' +
    '<a href="http://openstreetmap.org/">OpenStreetMap</a>' +
    ' contributors </span>';
  var attr_overpass = '<span data-l10n-id="attr_overpass">' +
    'POI via <a href="http://www.overpass-api.de/">Overpass API</a></span>';

  var osm = new L.TileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
      opacity: 0.7,
      attribution: [attr_overpass,attr_osm].join('| ')
    });
  osm.on('tileload', function(tile) {
    console.log('Tile Loaded');
    console.log(tile);
    debugger;
  });

  var map = new L.Map('map').addLayer(osm).setView(new L.LatLng(48.84702,2.37705), 17);

  /*User Location*/
  map.locate({
    setView: true,
    enableHighAccuracy: true,
    locate: true,
    maximumAge: 60000,
    timeout: 8000
  }).on('locationfound', function(e) {
    var marker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup(
        '<span data-l10n-id="locate_ok">Vous êtes par ici&nbsp;&nbsp;</span>');
    map.addLayer(marker);
    function onPopupClick() {
      document.l10n.localize(['locate_ok',], function(l10n) {
        var node = document.querySelector('[data-l10n-id=locate_ok]');
        if (node !== null ) {
          node.textContent = l10n.entities.locate_ok.value;
        }
      });
    }
    marker.on('click', onPopupClick);
  })
  .on('locationerror', function(e) {
    console.log('Échec de localisation de l\'utilisateur');
    console.log(e);
  });
});
