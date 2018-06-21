import React, { Component } from 'react';
import { LayerManagerLeaflet } from 'layer-manager';
import groupBy from 'lodash/groupBy';
import wriAPISerializer from 'wri-json-api-serializer';

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
      legendSpec: [],
      apiUrl: 'https://api.resourcewatch.org/v1/layer?application=rw&provider=cartodb&page[size]=5'
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
          const layerSpecParsed = groupBy(wriAPISerializer(layerSpec), 'dataset');
          const legendSpec = Object.keys(layerSpecParsed).map(s => {
            const layers = layerSpecParsed[s].map(l => ({
              ...l,
              active: true
            }))
            return {
              dataset: s,
              visible: true,
              layers
            }
          });
          this.setState({ legendSpec });
          this.layerManager.remove();
          if (layerSpec.data.length <= 5) {
            this.layerManager.add(layerSpec, {
              opacity: 1,
              visibility: true,
              zIndex: 2
            });
          }
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
    const { legendSpec } = this.state;
    if (legendSpec) {
      console.log(legendSpec);
    }
    return (
      <div className="App">
        <div id="c-map"></div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input" value={this.state.apiUrl} onChange={this.setValue} />
        </form>
        <div className="legend">
          {legendSpec.length > 0 &&
            <Legend
              LegendItemToolbar={<LegendItemToolbar />}
              LegendItemTypes={<LegendItemTypes />}
              layerGroups={legendSpec}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
