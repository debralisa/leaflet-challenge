// Store the API endpoing as queryURLMth
const queryURLMth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(queryURLMth).then(function(data){

  // Send data.features and data.features object to the createFeatures function.
    createFeatures(data.features);
  });    

// function createFeatures(earthquakeData, platesData){

    // // Give each feature a popup describing the place and time of the earthquakes
    // function onEachFeature(feature, layer){
    //     layer.on({
    //        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
    //         mouseover: function(event) {
    //             layer = event.target;
    //             layer.setStyle({
    //                 fillOpacity: 0.9
    //             });
    //         },
    //         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
    //         mouseout: function(event) {
    //             layer = event.target;
    //             layer.setStyle({
    //                 fillOpacity: 0.5
    //             });
    //         },
    //         // When a feature (mag) is clicked, it enlarges to fit the screen.
    //         click: function(event) {
    //             myMap.fitBounds(event.target.getBounds(mag));
    //         }
    //     });

function createFeatures(earthquakeData){

    // Create a popup popup describing the place and time of the earthquakes for each feature
    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>Where: ${feature.properties.place}</h3><hr><p>Time: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Number of "Felt" Reports: ${feature.properties.felt}`);
    }
    
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    function createCircleMarker(feature, latlng){
       let options = {
        radius:mapRadius(feature.properties.mag),
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
       } 
       return L.circleMarker(latlng,options);
    }
    // Create a variable for earthquakes to hold latitude and longitude, 
    // each feature for popup, and circle radius/color/weight/opacity
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createCircleMarker
    });

    // Send earthquakes layer to the createMap function
    createMap(earthquakes);
}

// Circles color palette based on depth data marker: 
function chooseColor(depth) {
    switch(true){
        case depth >= 90:
            return "red";
        case depth >= 70:
            return "darkorange";
        case depth >= 50:
            return "orange";
        case depth >= 30:
            return "gold";
        case depth >= 10:
            return "yellow";
        default:
            return "lightgreen";

          }
}
function mapRadius(mag) {
    if (mag === 0) {
        return 1;
    }

    return mag * 2;
}


// Create map legend 
let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let depth = [-10, 10, 30, 50, 70, 90];
    let labels = [];
    let legendInfo = "<h4>Depth</h4>";

    div.innerHTML = legendInfo

    // created a for loop to go through each magnitude item to label and color
    // the legend.  Push to labels array as list item
    for (let i = 0; i < depth.length; i++) {
          labels.push('<ul style="background-color:' + chooseColor(depth[i] + 1) + '"> <span>' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '' : '+') + '</span></ul>');
        }

      // add each label list item to the div under the <ul> tag
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
    return div;
  };


// Create map
function createMap(earthquakes) {
   // Define outdoors and graymap layers
   let streetstylemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "outdoors-v11",
    // using the API_KEY in config.sys for mapbox.com
    accessToken: API_KEY
  })

  let graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "light-v10",
    accessToken: API_KEY
  })

  // Define satellite layer
  let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "satellite-streets-v12",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold the base layers
  let baseMaps = {
    "Outdoors": streetstylemap,
    "Grayscale": graymap,
    "Satellite" : satellite
  };

  // Create overlay object to hold the overlay layer
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create the map, giving it the streetmap, earthquakes, and satellite layers to display on load
  let myMap = L.map("map", {
    center: [
      39.8282, -98.5795
    ],
    zoom: 4,
    layers: [streetstylemap, earthquakes, satellite]
  });

  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  legend.addTo(myMap);
}
