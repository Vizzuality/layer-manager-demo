import React, { Component } from 'react';
import { LayerManagerLeaflet } from 'layer-manager';
import wriAPISerializer from 'wri-json-api-serializer';
import flatten from 'lodash/flatten';
import ReactMapGL from 'react-map-gl';

import {
  Legend,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

import '../node_modules/wri-api-components/dist/components.css';
import './App.css';


const L = window.L;

class App extends Component {
  constructor() {
    super();
    this.state = {
      layerGroups: [],
      datasets: [],
      apiUrl: 'https://api.resourcewatch.org/v1/dataset?application=rw&includes=metadata,vocabulary,layer&page[size]=1',
      viewport: {
        width: 1000,
        height: 1000,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    };
  }
  componentDidMount() {
    this.initMap();
    this.layerManager = new LayerManagerLeaflet(this.map, {
      serialize: false
    });
    // this.getLayer(this.state.apiUrl);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.datasets !== this.state.datasets) {
      this.layerManager.add(flatten(nextState.datasets.map(d => d.layer)), {
        opacity: 1,
        visibility: true,
        serialize: false
      });
    }
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
        .then(response => {
          const datasets = wriAPISerializer(response);
          this.setState({ datasets })
          this.setState({ layerGroups: datasets.map(d => ({
            dataset: d.id,
            opacity: 1,
            visible: true,
            layers:
              d.layer &&
              d.layer.map(l => ({
                ...l,
                active: true,
                opacity: 1,
                visible: true
              }))
          })) })
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
    this.map = this.mapRef.getMap();
    console.log(this.map);
    // this.map = L.map('c-map', {
    //   zoomControl: false
    // }).setView([27, 12], 3);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);
    // L.control.zoom({
    //   position:'topright'
    // }).addTo(this.map);
  }

  render() {
    const { layerGroups } = this.state;
    return (
      <div className="App">
        <Icons />
        <ReactMapGL
          ref={el => { this.mapRef= el }}
          mapboxApiAccessToken={'pk.eyJ1IjoiZWRicmV0dCIsImEiOiJjaXVpZjI4dDkwMDJ3MnRxbGJhaG05bXV2In0.i-xl06neUzmzlxi9EPBfjA'}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
        />
        {/* <div id="c-map" onClick={
          () => {
            console.log(this.layerManager.find('e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7'));
            this.layerManager.find('e1dc5626-c1c2-4d60-a6a9-746a33fe1cb7').setOpacity(0);
          }
        }></div> */}
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Enter and RW API url..." type="text" className="input" value={this.state.apiUrl} onChange={this.setValue} />
        </form>
        <div className="legend">
          {layerGroups.length > 0 &&
            <Legend
              maxHeight={300}
              layerGroups={layerGroups}
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
