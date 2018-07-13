import React, { Component } from 'react';

import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

import Map from '../components/map';
import Legend from '../components/legend';
import Datasets from '../providers/datasets';
import Search from '../components/search';

import { scalePow } from 'd3-scale';

import './styles.css';

class App extends Component {
  state = {
    startDate: 2001,
    endDate: 2002
  }

  componentDidMount() {
    setTimeout(() => {
      setInterval(() => {
        const { startDate, endDate } = this.state;
        this.setState({
          endDate: (endDate === 2016) ? 2002 : endDate + 1
        })
      }, 500);
    }, 3500);
  }
  render() {
    const {
      layers,
      layerGroups,
      activeLayers,
      apiUrl
    } = this.props;

    return (
      <div className="l-page">
        <Map>
          {(map) => (
            <LayerManager map={map} plugin={PluginLeaflet}>
              {activeLayers && activeLayers.map(l =>
                <Layer
                  key={l.id}
                  {...l}
                  decode={{
                    startDate: this.state.startDate,
                    endDate: this.state.endDate
                  }}
                  decodeFunction={(data, w, h, z) => {
                    const { startDate, endDate } = this.state;

                    const components = 4;
                    const exp = z < 11 ? 0.3 + ((z - 3) / 20) : 1;
                    const yearStart = startDate;
                    const yearEnd = endDate;
                    const imgData = data;

                    const myscale = scalePow()
                      .exponent(exp)
                      .domain([0, 256])
                      .range([0, 256]);

                    for (let i = 0; i < w; ++i) {
                      for (let j = 0; j < h; ++j) {
                        const pixelPos = ((j * w) + i) * components;
                        const intensity = imgData[pixelPos];
                        const yearLoss = 2000 + (imgData[pixelPos + 2]);

                        if (yearLoss >= yearStart && yearLoss < yearEnd) {
                          imgData[pixelPos] = 220;
                          imgData[pixelPos + 1] = (72 - z) + 102 - (3 * myscale(intensity) / z);
                          imgData[pixelPos + 2] = (33 - z) + 153 - ((intensity) / z);
                          imgData[pixelPos + 3] = z < 13 ? myscale(intensity) : intensity;
                        } else {
                          imgData[pixelPos + 3] = 0;
                        }
                      }
                    }

                    return imgData;
                  }}                  
                />
              )}
            </LayerManager>
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
