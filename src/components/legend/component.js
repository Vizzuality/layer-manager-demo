import React, { Component } from 'react';

import {
  Legend,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

import '../../../node_modules/wri-api-components/dist/components.css';

class MapLegend extends Component {
  render() {
    const { layerGroups, layers } = this.props;
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
