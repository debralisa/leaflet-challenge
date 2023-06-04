# Leaflet-Challenge

## Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Part 1:  Create the Earthquake Visualization
The first task was to visualize an earthquake dataset and complete the following steps:
1. Get my dataset. The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I chose the whole month (last 30 days) dataset from the USGS GeoJSON Feed page, and used the URL of the JSON to pull in the data for the visualization. 

2. The challenge required me to import and visualize the data by doing the following: 
    a.Using Leaflet, create a map that plots all the earthquakes from the dataset based on their longitude and latitude.
    b. The data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    c. Include popups that provide additional information about the earthquake when its associated marker is clicked.
    d. Create a legend that will provide context for the map data.
3. I created my map, giving it the streetmap, earthquakes, and satellite layers

## Part 2:  Gather and Plot More Data (Optional with no extra points earning)
Did not complete.  I did add the satellite view overlay on the map, because I really liked the additional view option.  However, I did not complete the tectonic plates data plotting.

###File Names/Folder Names

#ReadMe.md, Leaflet-Part-1 folder containing index.html (html file), Static folder containing JS folder with: logic3.js (main javascript file with map/earthquake scripting), and CSS folder with style.css file. Leaflet-Part-2 folder which is empty in the event that I will at some point complete the tectonic plate bonus challenge.​


## Sources

* [Leaflet documentation](http://leafletjs.com/)
* [MapBox API](https://www.mapbox.com/)
* [USGS dataset](https://earthquake.usgs.gov)
