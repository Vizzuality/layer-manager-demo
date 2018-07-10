import React, { Component } from 'react';

import Map from '../components/map';
import Legend from '../components/legend';
import Layers from '../components/layers';
import Datasets from '../components/datasets';
import Search from '../components/search';

class App extends Component {
  render() {
    const {
      // layers
      layers,
      layerGroups,
      activeLayers,
      // form actions
      apiUrl,
      // legend actions
      onChangeOpacity,
      onChangeVisibility,
      onChangeOrder,
      onChangeLayer,
      onRemoveLayer
    } = this.props;
    return (
      <div className="App">
        <Map mapRef={el => { this.map = el }} />
        {this.map && <Layers map={this.map} layers={activeLayers} />}
        <Datasets apiUrl={apiUrl} />
        <Search />
        <div className="legend">
          <Legend
            layers={layers}
            layerGroups={layerGroups}
            onChangeOpacity={onChangeOpacity}
            onChangeVisibility={onChangeVisibility}
            onChangeOrder={onChangeOrder}
            onChangeLayer={onChangeLayer}
            onRemoveLayer={onRemoveLayer}
          />
        </div>
      </div>
    );
  }
}

export default App;
