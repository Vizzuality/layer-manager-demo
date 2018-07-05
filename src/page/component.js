import React, { Component } from 'react';

import {
  Legend,
  LegendItemToolbar,
  LegendItemTypes,
  Icons
} from 'wri-api-components';

class App extends Component {
  render() {
    const {
      layerGroups,
      apiUrl,
      handleSubmit,
      handleInputChange,
      onChangeOpacity,
      onChangeVisibility,
      onChangeOrder,
      onChangeLayer
    } = this.props;
    return (
      <div className="App">
        <Icons />
        <div id="c-map"></div>
        <form onSubmit={handleSubmit}>
          <input placeholder="Enter and RW API url..." type="text" className="input" value={apiUrl} onChange={handleInputChange} />
        </form>
        <div className="legend">
          {layerGroups &&
            <Legend
              maxHeight={300}
              layerGroups={layerGroups}
              // List item
              LegendItemToolbar={<LegendItemToolbar />}
              LegendItemTypes={<LegendItemTypes />}
              // Actions
              onChangeOpacity={onChangeOpacity}
              onChangeVisibility={onChangeVisibility}
              onChangeOrder={onChangeOrder}
              onChangeLayer={onChangeLayer}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
