import React, { Component } from 'react';
import { LayerManagerLeaflet } from 'layer-manager';

import {
  // Legend
  Legend,

  // Toolbar
  LegendItemToolbar,

  // Types
  LegendItemTypes

} from 'wri-api-components';

import './App.css';
const L = window.L;

class App extends Component {
  constructor() {
    super();
    this.state = {
      layerSpec: {},
      apiUrl: 'http://api.resourcewatch.org/v1/layer?application=rw&provider=cartodb'
    };
  }
  componentDidMount() {
    this.initMap();
    this.layerManager = new LayerManagerLeaflet(this.map);
    this.getLayer(this.state.apiUrl);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.getLayer();
  }

  getLayer = () => {
    const { apiUrl } = this.state;
    if (apiUrl) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(layerSpec => {
          this.layerManager.remove();
          this.layerManager.add(layerSpec, {
            opacity: 1,
            visibility: true,
            zIndex: 2
          });
        })
    }
  }

  setValue = e => {
    this.setState({ apiUrl: e.target.value });
  }

  initMap = () => {
    this.map = L.map('c-map', {
      zoomControl: false
    }).setView([27, 12], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    L.control.zoom({
      position:'topright'
    }).addTo(this.map);
  }

  render() {
    return (
      <div className="App">
        <div id="c-map"></div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input" value={this.state.apiUrl} onChange={this.setValue} />
        </form>
        <Legend
          LegendItemToolbar={<LegendItemToolbar />}
          LegendItemTypes={<LegendItemTypes />}
        />
      </div>
    );
  }
}

export default App;
