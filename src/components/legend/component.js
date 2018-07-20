import React, { Component } from 'react';
import Select from 'react-select';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

import Timeline from '../timeline';

import './styles.css';

const options = [
  { label: '10%', value: 10},
  { label: '15%', value: 15},
  { label: '20%', value: 20},
  { label: '25%', value: 25},
  { label: '30%', value: 30},
  { label: '50%', value: 50},
  { label: '75%', value: 75}
];

class MapLegend extends Component {
  render() {
    const { layerGroups, onChangeTimeline, onChangeThreshold, ...rest } = this.props;
    return (
      <div className="c-legend">
        <Icons />
        {layerGroups && !!layerGroups.length &&
          <Legend
            layerGroups={layerGroups}
          >
            {layerGroups.map((lg, i) => {
              const activeLayer = lg.layers.find(l => l.active);
              const { decodeParams, legendConfig } = activeLayer;
              return (
                <LegendListItem
                  index={i}
                  key={lg.id}
                  layerGroup={lg}
                  toolbar={
                    <LegendItemToolbar {...rest} />
                  }
                >
                  {activeLayer && activeLayer.params && activeLayer.params.thresh &&
                    <Select
                      className="select"
                      value={options.find(o => o.value === activeLayer.params.thresh)}
                      options={options}
                      onChange={value => onChangeThreshold(activeLayer, value.value)}
                    />
                  }
                  <LegendItemTypes />
                  {decodeParams && decodeParams.startDate &&
                    <Timeline
                      className="timeline"
                      handleChange={range => onChangeTimeline(activeLayer, range)}
                      {...decodeParams}
                      trackStyle={[{ backgroundColor: legendConfig && legendConfig.items[0].color }, { backgroundColor: 'light grey' }]}
                    />
                  }
                </LegendListItem>
              );
            })
            }
          </Legend>
        }
      </div>
    );
  }
}

MapLegend.defaultProps = {
  maxHeight: 300,
  LegendItemToolbar: <LegendItemToolbar />,
  LegendItemTypes: <LegendItemTypes />
};

export default MapLegend;
