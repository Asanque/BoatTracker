// react
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {Fill, Stroke, Style, Circle} from 'ol/style';
import XYZ from 'ol/source/XYZ'
import {transform} from 'ol/proj'
import Polygon from 'ol/geom/Polygon';

function MapWrapper(props) {

  // set intial state
  const [ map, setMap ] = useState(null)
  const [ ws, setWs] = useState(null)
  const [ currentCoord, setCoord ] = useState(null)
  
  

  const vectorSource = new VectorSource({
    features: []
  })

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const mapRef = useRef()
  mapRef.current = map

  useEffect( () => {

    const initialMap = new Map({
      target: 'mapContainer',
      layers: [
        
        // USGS Topo
        new TileLayer({
          source: new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          })
        }),

        vectorLayer

      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2
      }),
      controls: []
    })

    

    setMap(initialMap)

  },[])

  useEffect( () => {
    if (ws !== null){
      console.log(ws)
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      setCoord(json)
      
      };}
  },[ws])
  


useEffect( () => {
  setWs(new WebSocket("ws://localhost:4000/",'echo-protocol'));
},[])

useEffect( () => {
  if (currentCoord !== null){
    console.log(currentCoord)
    addMarker([currentCoord.lat, currentCoord.lon])
  }
},[currentCoord])

  function addMarker(coordinates) {
    const transormedCoord = transform(coordinates, 'EPSG:4326' , 'EPSG:3857')
    console.log(transormedCoord)
    var marker = new Feature({
      geometry: new Polygon([transormedCoord]),
      labelPoint: new Point(transormedCoord)
    });
    marker.setStyle(new Style({
      image: new Circle({
        radius: 10,
        stroke: new Stroke({
          color: "red",
          width: 2000
        }),
        fill: new Fill({
          color: "blue"
        })
      })}));
      
    vectorSource.addFeature(marker);
    
  }



  // render component
  return (      
    <div id="mapContainer" className="map-container"></div>
  ) 

}

export default MapWrapper