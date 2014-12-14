'use strict';


var L = L || {};


function latLngToTileXY(lat, lng, zoom) {
  var n = Math.pow(2, zoom);
  var xtile = Math.floor(n * ((lng + 180) / 360));
  var ytile = (
    Math.floor(
      (1 - Math.log(
        Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)
        ) / Math.PI) / 2 * n
      )
    );

  return {
    zoom: zoom,
    x: xtile,
    y: ytile
  };
}


function bboxTilesUrl(bbox, zoom) {
  var firstTileCoord = latLngToTileXY(bbox.upperLeftLat, bbox.upperLeftLng, zoom);
  var lastTileCoord = latLngToTileXY(bbox.bottomRightLat, bbox.bottomRightLng, zoom);

  var urls = [];
  for (var x = firstTileCoord.x; x <= lastTileCoord.x; x++) {
    for (var y = firstTileCoord.y; y <= lastTileCoord.y; y++) {
      urls.push(
        'http://c.tile.stamen.com/toner-lite/' + zoom +
        '/' + x + '/' + y + '.png'
      );
    }
  }

  return urls;
}


function listTileForBbox(bbox) {
  for (var zoom = 10; zoom <= 18; zoom++) {
    var result = bboxTilesUrl(bbox, zoom);
    for (var i = 0; i < result.length; i++) {
      console.log(result[i]);
    }
  }
}


var parisBbox = {
  upperLeftLat: 49.046940,
  upperLeftLng: 2.086790,
  bottomRightLat: 48.658291,
  bottomRightLng: 2.637910
};
listTileForBbox(parisBbox);
