import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { LayerManagerLeaflet } from 'layer-manager';

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
    this.layerManager = new LayerManagerLeaflet(this.map, {
      serialize: false
    });
    this.getDatasets();
  }

  componentWillUpdate(nextProps) {
    if (!isEqual(nextProps.activeLayers, this.props.activeLayers)) {
      this.updateLayers(nextProps.activeLayers);
    }
  }

  updateLayers = (layers) => {
    if (layers && layers.length) {
      layers.forEach((l, i) => {
        this.layerManager.add(l, { ...l, zIndex: i });
      })
    }
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
      getDatasets(apiUrl);
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
    setData({ layers: layerGroupsIds.map(id => layers.find(d => d.dataset === id)) })
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
