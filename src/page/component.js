import React, { Component } from 'react';

import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

import Map from '../components/map';
import Legend from '../components/legend';
import Datasets from '../providers/datasets';
import Search from '../components/search';
import Popup from '../components/map/components/popup';

import decodeFuncs from './decode.js';

import './styles.css';

class App extends Component {
  state = {
    iso: 'BRA'
  }

  render() {
    const {
      layers,
      layerGroups,
      activeLayers,
      apiUrl
    } = this.props;
    
    return (
      <div className="l-page" onClick={() => { this.setState({ iso: (this.state.iso === 'BRA') ? 'COL' : 'BRA' })}}>
        <Map>
          {(map) => (
            <React.Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {activeLayers && activeLayers.map(l => {
                  const decodeLayerKeys = Object.keys(decodeFuncs);

                  return (
                    <Layer
                      key={l.id}
                      {...l}
                      sqlParams={{
                        where: {
                          iso: this.state.iso
                        }
                      }}
                      {...decodeLayerKeys.indexOf(l.id) > -1 && {
                        params: { url: l.layerConfig.body.url, thresh: 30, dataMaxZoom: 12 },
                        decodeParams: { startDate: layers[0].startDate, endDate: layers[0].endDate },
                        decodeFunction: decodeFuncs[l.id]
                      }}          
                    />
                  )
                }
                )}
              </LayerManager>
              <Popup map={map} layers={activeLayers} />
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
