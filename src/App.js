import React, { Component } from 'react';
import { LayerManagerLeaflet, LayerManagerGmaps } from 'layer-manager';
import isEmpty from 'lodash/isEmpty';

import {
  // Legend
  Legend,

  // Toolbar
  LegendItemToolbar,
  LegendItemButtonBBox,
  LegendItemButtonLayers,
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove,

  // Types
  LegendItemTypes,
  LegendItemTypeBasic,
  LegendItemTypeChoropleth,
  LegendItemTypeGradient,
  LegendItemTypeProportional

} from 'wri-api-components';

import './App.css';
const L = window.L;
const google = window.google;

class App extends Component {
  constructor() {
    super();
    this.state = {
      layerSpec: {}
    };
  }
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
        this.setState({ layerSpec });
      })
  }

  componentWillUpdate(nextProps, nextState) {
    const { layerSpec } = nextState;
    if (!isEmpty(layerSpec)) {
      this.layerManager.add({ data: [layerSpec.data] });
    }
  }

  initMap = () => {
    this.map = L.map('c-map').setView([27, 12], 3);
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
    const { layerSpec } = this.state;
    return (
      <div className="App">
        <div id="c-map"></div>
        {layerSpec &&
          <Legend
            LegendItemToolbar={<LegendItemToolbar />}
            LegendItemTypes={<LegendItemTypes />}
            // layerGroups={[layerSpec.data]}
          />
        }
      </div>
    );
  }
}

export default App;
