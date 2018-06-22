import React, { Component } from 'react';
import { LayerManagerLeaflet } from 'layer-manager';
import groupBy from 'lodash/groupBy';
import wriAPISerializer from 'wri-json-api-serializer';

import {
  Legend,
  LegendItemToolbar,
  LegendItemTypes
} from 'wri-api-components';

import '../node_modules/wri-api-components/dist/components.css';
import './App.css';


const L = window.L;

class App extends Component {
  constructor() {
    super();
    this.state = {
      legendSpec: [],
      apiUrl: ''
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
          console.log(legendSpec)
          this.setState({ legendSpec });
          this.layerManager.add(layerSpec, {
            opacity: 1,
            visibility: true,
            zIndex: 2
          });
        })
        .catch(err => {
          console.warn(err);
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
    return (
      <div className="App">
        <div id="c-map"></div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Enter and RW API url..." type="text" className="input" value={this.state.apiUrl} onChange={this.setValue} />
        </form>
        <div className="legend">
          {legendSpec.length > 0 &&
            <Legend
              maxHeight={300}
              layerGroups={legendSpec}
              // List item
              LegendItemToolbar={<LegendItemToolbar />}
              LegendItemTypes={<LegendItemTypes />}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
