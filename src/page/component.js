import React, { Component } from 'react';

import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

import Map from '../components/map';
import Legend from '../components/legend';
import Datasets from '../providers/datasets';
import Search from '../components/search';
import Popup from '../components/map/components/popup';

import './styles.css';

class App extends Component {
  render() {
    const {
      layers,
      layerGroups,
      activeLayers,
      apiUrl
    } = this.props;
    console.log(activeLayers);
    return (
      <div className="l-page">
        <Map>
          {(map) => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {activeLayers && activeLayers.map(l => (
                  <Layer
                    key={l.id}
                    {...l}
                  />
                ))}
              </LayerManager>
              {activeLayers && <Popup map={map} layers={activeLayers} />}
            </React.Fragment>
          )}
        </Map>
        <Datasets apiUrl={apiUrl} />
        <Search className="search" />
        <div className="legend">
          <Legend
            layers={layers}
            layerGroups={layerGroups}
            activeLayers={activeLayers}
          />
        </div>
      </div>
    );
  }
}

export default App;
