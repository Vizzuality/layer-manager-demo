import React, { Component } from 'react';

import {
  Legend,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

import './styles.css';

class MapLegend extends Component {
  render() {
    const { layerGroups } = this.props;
    return (
      <div className="c-legend">
        <Icons />
        {layerGroups &&
          <Legend
            {...this.props}
          />
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
