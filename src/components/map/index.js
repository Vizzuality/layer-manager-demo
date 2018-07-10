import { createElement, PureComponent } from 'react';

import Component from './component';

const L = window.L;

class MapContainer extends PureComponent {
  componentDidMount()  {
    const { mapRef } = this.props;
    this.initMap();
    mapRef(this.map);
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
    return createElement(Component, {
      ...this.props
    });
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
