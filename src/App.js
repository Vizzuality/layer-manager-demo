import React, { Component } from 'react';
import { LayerManagerLeaflet, LayerManagerGmaps } from 'layer-manager';
import wriSerializer from 'wri-json-api-serializer';

import './App.css';
const L = window.L;
const google = window.google;

class App extends Component {
  componentDidMount() {
    this.initMap();
    this.layerManager = new LayerManagerLeaflet(this.map, {
      serialize: true
    });
    // this.layerManager = new LayerManagerGmaps(this.map, {
    //   serialize: true
    // });
    fetch('https://api.resourcewatch.org/v1/layer/0ac7bf69-388a-48b0-a869-c3240031c4bf?application=rw&provider=cartodb')
      .then(response => response.json())
      .then(layerSpec => {

        this.layerManager.add({ data: [layerSpec.data] });
      })
  }

  initMap = () => {
    this.map = L.map('c-map').setView([51.505, -0.09], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    // this.map = new google.maps.Map(document.getElementById('c-map'), {
    //   center: {lat: -34.397, lng: 150.644},
    //   zoom: 8
    // });
  }

  render() {
    return (
      <div className="App">
        <div id="c-map"></div>
      </div>
    );
  }
}

export default App;
