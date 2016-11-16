// @flow
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import styles from './LeafletComponent.css';
import L from 'leaflet';
import geojson from 'json!./test.geojson';
import ToolbarComponent from './ToolbarComponent';
import TravelDialog from './TravelDialog';
import 'leaflet-curve';
const position = [51.505, -0.09];

//http://www.digital-geography.com/visualizing-nasa-black-marble-with-tilemill-and-leaflet/
//https://github.com/clhenrick/React-Leaflet-demo/blob/master/src/Map.js


let config = {};
config.params = {
  center: [0.0,0.0],
  zoomControl: false,
  zoom: 3,
  maxZoom: 19,
  minZoom: 2,
  scrollwheel: false,
  legends: true,
  infoControl: false,
  attributionControl: false,
  worldCopyJump: true
};
config.tileLayer = {
  uri:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
  params: {
    // minZoom: 11,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    id: '',
    accessToken: ''
  }
}

class LeafletComponent extends React.Component {
  static propTypes = {
    addPoint: PropTypes.func.isRequired
  };
  
    constructor(props) {
        super(props);
        this.state = {
        map: null,
        tileLayer: null,
        geojsonLayer: null,
        geojson: null,
        subwayLinesFilter: '*',
        numEntrances: null
        };
        this._mapNode = null;

        this.getLatLng = this.getLatLng.bind(this);
        this.getPointMarker = this.getPointMarker.bind(this);
        this.getPolyLine = this.getPolyLine.bind(this);
        this.getCurvedPath = this.getCurvedPath.bind(this);
    }
  componentDidUpdate(){
    console.log("updating..")
  }
 componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    // this.getData();
    // create the Leaflet map object
    if (!this.state.map) this.init(this._mapNode);
  }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
    }

  componentDidUpdate(prevProps, prevState) {
    // code to run when the component receives new props or state
    // check to see if geojson is stored, map is created, and geojson overlay needs to be added
    if (this.state.geojson && this.state.map && !this.state.geojsonLayer) {
      // add the geojson overlay
      // this.addGeoJSONLayer(this.state.geojson);
    }
  }
  componentWillUnmount() {
    // code to run just before unmounting the component
    // this destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  getData() {
    // could also be an AJAX request that results in setting state with the geojson data
    // for simplicity sake we are just importing the geojson data using webpack's json loader
    this.setState({
      numEntrances: geojson.features.length,
      geojson
    });
  }


  addGeoJSONLayer(geojson) {
    // create a native Leaflet GeoJSON SVG Layer to add as an interactive overlay to the map
    // an options object is passed to define functions for customizing the layer
    const geojsonLayer = L.geoJson(geojson, {
      onEachFeature: this.onEachFeature,
      pointToLayer: this.pointToLayer,
      filter: this.filterFeatures
    });
    // add our GeoJSON layer to the Leaflet map object
    geojsonLayer.addTo(this.state.map);
    // store the Leaflet GeoJSON layer in our component state for use later
    this.setState({ geojsonLayer });

  }

  pointToLayer(feature, latlng) {
    // renders our GeoJSON points as circle markers, rather than Leaflet's default image markers
    // parameters to style the GeoJSON markers
    var markerParams = {
      radius: 4,
      fillColor: 'orange',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };
    return L.circleMarker(latlng, markerParams);
  }

  getPolyLine(PointList){
    return new L.Polyline(PointList, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
    });

  }

  getCurvedPath(depart, destination){
    var latA = destination.lat;
    var latB = depart.lat;
    var longA = destination.lng;
    var longB = depart.lng;

    var curvedPath = L.curve([
              'M',[latA,longA],
					    'Q',[latA,longA],
						   [(latA + latB)*.55,(longA + longB)*.15],
					    'T',[latB,longB]
             ]);
    return curvedPath;
  }

  getLatLng(Latitude, Longitude){
    return new L.LatLng(Latitude, Longitude);
  }

  getPointMarker(point){
    var markerParams = {
      radius: 3,
      fillColor: 'red',
      color: '#fff',
      weight: 1,
      opacity: 0.5,
      fillOpacity: 0.8
    };

    return L.circleMarker(point, markerParams);
}

  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.NAME && feature.properties.LINE) {

      // assemble the HTML for the markers' popups (Leaflet's bindPopup method doesn't accept React JSX)
      const popupContent = `<h3>${feature.properties.NAME}</h3>
        <strong>Access to MTA lines: </strong>${feature.properties.LINE}`;

      // add our popups
      layer.bindPopup(popupContent);
    }
  }
  
  init(id) {
    if (this.state.map) return;
    // this function creates the Leaflet map object and is called after the Map component mounts
    let map = L.map(id, config.params);
    L.control.scale({ position: "bottomleft"}).addTo(map);

    // a TileLayer is used as the "basemap"
    const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

    // set our state to include the tile layer
    this.setState({ map, tileLayer });
  }
    render() {
      const { addPoint } = this.props;
      var fullscreen = {
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              outline: 'none',
          }
        return (
          

          <div className={styles.fullscreen} >
            <TravelDialog 
            getLatLng={this.getLatLng}
            getPolyLine={this.getPolyLine}
            getPointMarker={this.getPointMarker} 
            getCurvedPath={this.getCurvedPath}
            map={this.state.map} />
            <div  style={fullscreen} ref={(node) => this._mapNode = node} id="map" />
          </div>
        );
    }
}

export default LeafletComponent;