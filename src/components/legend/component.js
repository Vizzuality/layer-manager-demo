import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';

import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  LegendItemButtonVisibility,
  Icons
} from 'wri-api-components';

import './styles.css';

class MapLegend extends Component {
  componentWillUpdate(nextProps) {
    const { onChangeTimeline, layers, activeLayers } = nextProps;
    const { startDate, endDate } = layers && layers.length && layers[0];
    if (!isEqual(layers, this.props.layers)) {
      setTimeout(() => {
        onChangeTimeline(activeLayers[0], startDate, endDate === 2016 ? 2002 : endDate + 1)
      }, 1000);
    }
  }

  render() {
    const { layerGroups, ...rest } = this.props;
    return (
      <div className="c-legend">
        <Icons />
        {layerGroups && !!layerGroups.length &&
          <Legend
            layerGroups={layerGroups}
          >
            {layerGroups.map((lg, i) => (
              <LegendListItem
                index={i}
                key={lg.id}
                layerGroup={lg}
                toolbar={
                  <LegendItemToolbar {...rest} />
                }
              >
                <LegendItemTypes />
              </LegendListItem>
            ))}
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
