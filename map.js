var center = new L.LatLng(-29, 132);
var map = new L.Map("map", {
  center: center,
  zoom: 4,
  attributionControl: true,
  zoomControl: true,
  scrollWheelZoom: true,
});

//Define layers
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    'Basemap &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Map by <a href=https://www.linkedin.com/in/alex-leith/>Auspatious</a>.',
}).addTo(map);

// //labels don't work on touch, so need a test. From http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
// function is_touch_device() {
//   return 'ontouchstart' in window // works on most browsers
//       || 'onmsgesturechange' in window; // works on ie10
// };

var NRMRegions = null;
var mainURL = "http://www.conference.nrmregionsaustralia.com.au/nrm-map/";

$.getJSON("nrm_reg_new.json", function (json) {
  console.log(json)
  var nrmGeoJson = topojson.feature(json, json.objects.NLPMU_2020)
    .features;
  NRMRegions = L.geoJson(nrmGeoJson, {
    style: function (feature) {
      return {
        stroke: true,
        color: "#bbb",
        weight: 2,
        fillColor: getColor(feature.properties.NRM_REGION),
        fillOpacity: 0.6,
      };
    },
    onEachFeature: function (feature, layer) {
      popupOptions = { maxWidth: 200 };
      layer.bindPopup(
        "<b>" +
          feature.properties.NLP_MU +
          "</b><br><a href=" +
          mainURL +
          feature.properties.NLP_MU.split(" ").join("-") +
          ">More Information</a>",
        popupOptions
      );

      layer.bindTooltip(feature.properties.NLP_MU);

      // //check for touch device
      // if (!is_touch_device()) {
      //   layer.bindLabel(feature.properties.NRM_REGION);
      // }

      layer.on({
        click: zoomToFeature,
      });
    },
  }).addTo(map);
});

var colours = [
  "#FB8072",
  "#80B1D3",
  "#33CC99",
  "#FF6666",
  "#fdb462",
  "#BC80BD",
  "#FFFFB3",
  "#BEBADA",
  "#ffc300",
  "#B3DE69",
  "#FCCDE5",
  "#FFFFFF",
  "#006666",
  "#996666",
  "#CC99FF",
  "#D9D9D9",
  "#FFFF66",
  "#666699",
  "#00CC99",
  "#CC6666",
  "#99ccff",
  "#66CC66",
  "#FF9933",
  "#FF6666",
  "#FDB462",
  "#F27EA5",
  "#2D88B5",
  "#6666CC",
  "#CCCC66",
  "#FB8072",
];
var index = 0;
function getColor(region) {
  if (index === colours.length) {
    index = 0;
  }
  index++;
  return colours[index - 1];
}
function zoomToFeature(e) {
  //map.fitBounds(e.target.getBounds());
}
