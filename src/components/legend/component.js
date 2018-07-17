import React, { Component } from 'react';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

import Timeline from '../timeline';

import './styles.css';

class MapLegend extends Component {
  render() {
    const { layerGroups, onChangeTimeline, ...rest } = this.props;
    return (
      <div className="c-legend">
        <Icons />
        {layerGroups && !!layerGroups.length &&
          <Legend
            layerGroups={layerGroups}
          >
            {layerGroups.map((lg, i) => {
              const activeLayer = lg.layers.find(l => l.active);
              return (
                <LegendListItem
                  index={i}
                  key={lg.id}
                  layerGroup={lg}
                  toolbar={
                    <LegendItemToolbar {...rest} />
                  }
                >
                  <LegendItemTypes />
                  <Timeline
                    className="timeline"
                    onChangeTimeline={onChangeTimeline}
                    activeLayer={activeLayer}
                    tickCount={4}
                  />
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
