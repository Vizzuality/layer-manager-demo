import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import LayerManager, { PluginLeaflet } from 'layer-manager';

import Component from './component';
import * as actions from './actions';
import reducers, { initialState } from './reducers';
import { getLayerGroups, getActiveLayers } from './selectors';

import '../../node_modules/wri-api-components/dist/components.css';
import './styles.css';

const L = window.L;

const mapStateToProps = ({ app }) => ({
  ...app,
  layerGroups: getLayerGroups({ ...app }),
  activeLayers: getActiveLayers({ ...app })
});

class Container extends PureComponent {
  componentDidMount() {
    this.initMap();
    this.layerManager = new LayerManager(this.map, PluginLeaflet, {
      serialize: false
    });
    this.getDatasets();
  }

  updateLayers = () => {
    const { activeLayers } = this.props;
    console.log(activeLayers);
    this.layerManager.remove();

    activeLayers.forEach((l, i) => {
      this.layerManager.add([l], { zIndex: 1000 - i });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { setData } = this.props;
    setData({ layers: [] })
    this.getDatasets();
  }

  getDatasets = () => {
    const { apiUrl, getDatasets } = this.props;
    if (apiUrl) {
      getDatasets(apiUrl)
        .then(this.updateLayers);
    }
  }

  handleInputChange = e => {
    const { setData } = this.props;
    setData({ apiUrl: e.target.value });
  }

  initMap = () => {
    this.map = L.map('c-map', {
      zoomControl: false
    }).setView([27, 12], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    L.control.zoom({
      position:'topright'
    }).addTo(this.map);
  }

  onChangeOpacity = (currentLayer, opacity) => {
    this.layerManager.setOpacity([currentLayer.id], opacity);

    const { setData, layers } = this.props;
    setData({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.opacity = opacity
      }
      return layer
    })})
  }
  
  onChangeVisibility = (currentLayer, visible) => {
    this.layerManager.setVisibility([currentLayer.id], visible);

    const { setData, layers } = this.props;
    setData({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.visible = visible
      }
      return layer
    })})
  }

  onChangeOrder = (layerGroupsIds) => {
    const { setData, layers } = this.props;
    const newLayers = layerGroupsIds.map(id => layers.find(d => d.dataset === id));

    newLayers.map((l, i) => {
      this.layerManager.setZIndex([l.layer], 1000 - i);
    })

    setData({ layers: newLayers })
  }

  onChangeLayer = currentLayer => {
    const { setData, layers } = this.props;
    setData({ layers: layers.map(l => {
      let layer = l
      if (l.dataset === currentLayer.dataset) {
        layer.layer = currentLayer.id
      }
      return layer
    })})
  }

  onRemoveLayer = currentLayer => {
    this.layerManager.remove([currentLayer.id]);
    
    const { setData } = this.props;
    const layers = this.props.layers.splice(0)
    layers.forEach((l, i) => {
      if (l.dataset === currentLayer.dataset) {
        layers.splice(i, 1);
        
      }
    })
    setData({ layers })
  }

  render() {
    return createElement(Component, {
      ...this.props,
      handleSubmit: this.handleSubmit,
      handleInputChange: this.handleInputChange,
      onChangeOpacity: this.onChangeOpacity,
      onChangeVisibility: this.onChangeVisibility,
      onChangeOrder: this.onChangeOrder,
      onChangeLayer: this.onChangeLayer,
      onRemoveLayer: this.onRemoveLayer
    });
  }
}

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(Container);
