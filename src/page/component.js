import React, { Component } from 'react';

import Map from '../components/map';
import Legend from '../components/legend';
import Layer from '../components/map/components/layer';
import Datasets from '../providers/datasets';
import Search from '../components/search';

import './styles.css';

class App extends Component {
  render() {
    const {
      layers,
      layerGroups,
      activeLayers,
      apiUrl
    } = this.props
    return (
      <div className="l-page">
        <Map>
          {activeLayers && activeLayers.map(l =>
            <Layer key={l.id} {...l} />
          )}
        </Map>
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
