var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.place);
  }

  var myStyle = {
    color: "white",
    fillColor: "purple"
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    style: function (feature) {
      if (feature.properties.mag < 1) {
        return {color: "#96f705", fillColor:"#96f705", fillOpacity: .5};
      }
      else if (feature.properties.mag >= 1.00 && feature.properties.mag <= 2) {
        return {color: "#f5d905", fillColor: "#f5d905", fillOpacity: .5};
      }
      else if (feature.properties.mag >= 2.000 && feature.properties.mag <= 4) {
        return {color: "#f29305", fillColor: "#f29305", fillOpacity: .5};
      }
      else if (feature.properties.mag > 4.000) {
        return {color: "#fc1a05", fillColor: "#fc1a05", fillOpacity: .5};
      }
      else {
        return {color: "black"}
      }
    },
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, 
        {
          radius: (feature.properties.mag)*10,
        });
    }
    
  });




  createMap(earthquakes);
}

function createMap(earthquakes) {
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}








// // Creating map object
// var myMap = L.map("map", {
//     center: [39.828, -98.580],
//     zoom: 5
//   });
  
//   // Adding tile layer to the map
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
//   // Store URL
//   var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
//   // Grab the data with d3
//   d3.json(url, function(response) {
    
//     // save and log the features data from the response 
//     var data = (response.features);

//     // initialize an array to hold the markers 
//     var earthquakeMarkers = [];

//     // loop through the data array
//     for (var i = 0; i < data.length; i++) {
//       var earthquake = data[i];
      
//       var markers = ([earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]])
//       console.log(markers)
      

//     }
//     // console.log(earthquakeMarkers);

//     // create a layer group made from the earthquake array, 
//     // pass into the createmap function
//     // (L.layerGroup(earthquakeMarkers)).addTo(myMap);
//   });