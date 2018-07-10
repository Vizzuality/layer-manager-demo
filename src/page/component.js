import React, { Component } from 'react';

import Map from '../components/map';
import Legend from '../components/legend';
import Layers from '../components/layers';
import Datasets from '../providers/datasets';
import Search from '../components/search';

import './styles.css';

class App extends Component {
  render() {
    const {
      // layers
      layers,
      layerGroups,
      activeLayers,
      // form actions
      apiUrl
    } = this.props;
    return (
      <div className="l-page">
        <Map mapRef={el => { this.map = el }} />
        {this.map && <Layers map={this.map} layers={activeLayers} />}
        <Datasets apiUrl={apiUrl} />
        <Search className="search" />
        <div className="legend">
          <Legend
            layers={layers}
            layerGroups={layerGroups}
          />
        </div>
      </div>
    );
  }
}

export default App;
