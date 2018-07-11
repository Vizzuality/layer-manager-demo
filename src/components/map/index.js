import React, { PureComponent } from 'react';

import './styles.css';
const L = window.L;

class MapContainer extends PureComponent {
  componentDidMount()  {
    this.initMap();
    this.initBasemap();
  }

  initMap = () => {
    const { controlPosition, ...mapOptions } = this.props;
    this.map = L.map('c-map', mapOptions);
    L.control.zoom({
      position: controlPosition
    }).addTo(this.map);
  }

  initBasemap = () => {
    const { tileLayer, labelLayer, maxZoom, attribution } = this.props;
    
    L.tileLayer(tileLayer, {
      maxZoom,
      attribution
    }).addTo(this.map);

    L.tileLayer(labelLayer, {
      maxZoom,
      attribution
    }).addTo(this.map).setZIndex(1001);
  }

  render() {
    const { children } = this.props;
    return (
      <div id="c-map" className="c-map">
        {this.map && children(this.map)}
      </div>
    )
  }
}

MapContainer.defaultProps = {
    zoomControl: false,
    center: [27, 12],
    zoom: 3,
    tileLayer: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    labelLayer: 'http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
    maxZoom: 19,
    minZoom: 2,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    controlPosition: 'topright'
};

export default MapContainer;
