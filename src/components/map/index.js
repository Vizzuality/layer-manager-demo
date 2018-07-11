import React, { PureComponent } from 'react';

import MapComponent from './component';
import LayerManager, { PluginLeaflet } from 'layer-manager';

import './styles.css';
const L = window.L;

class MapContainer extends PureComponent {
  componentDidMount()  {
    this.initMap();
    this.layerManager = new LayerManager(this.map, PluginLeaflet, {
      serialize: false
    });
  }

  initMap = () => {
    const { tileLayer, maxZoom, attribution, controlPosition } = this.props;
    this.map = L.map('c-map', this.props);
    L.tileLayer(tileLayer, {
      maxZoom,
      attribution
    }).addTo(this.map);
    L.control.zoom({
      position: controlPosition
    }).addTo(this.map);
  }

  render() {
    const { children } = this.props;
    return (
      <MapComponent>
        {React.Children.map(children, (child, i) => (child && React.cloneElement(child, { layerManager: this.layerManager, zIndex: 1000 - i, map: this.map })))}
      </MapComponent>
    )
  }
}

MapContainer.defaultProps = {
    zoomControl: false,
    center: [27, 12],
    zoom: 3,
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    controlPosition: 'topright'
};

export default MapContainer;
