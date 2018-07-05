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
    layers.forEach((l, i) => {
      this.layerManager.add(l, { ...l, zIndex: i });
    })
  }

  handleSubmit = e => {
    e.preventDefault();
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

  onChangeOpacty = (currentLayer, opacity) => {
    
  }

  onChangevisibility = () => {

  }

  onChangeOrder = (layerGroupsIds) => {
    const { setData, layers } = this.props;
    console.log(layerGroupsIds, layers);
    console.log(layerGroupsIds.map(id => layers.find(d => d.dataset === id)))
    setData({ layers: layerGroupsIds.map(id => layers.find(d => d.dataset === id)) })
  }

  onChangeLayer = currentLayer => {

    // const { setData, activeLayers, datasets } = this.props;
    // const dataset = datasets.find(d => (d.layer.find(l => l.id === currentLayer)))
    
    // setData({ activeLayers: uniqBy([...activeLayers, currentLayer], 'id') })
  }

  render() {
    return createElement(Component, {
      ...this.props,
      handleSubmit: this.handleSubmit,
      handleInputChange: this.handleInputChange,
      onChangeOpacity: this.onChangeOpacity,
      onChangeVisibility: this.onChangeVisibility,
      onChangeOrder: this.onChangeOrder,
      onChangeLayer: this.onChangeLayer
    });
  }
}

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(Container);
