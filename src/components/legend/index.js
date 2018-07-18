import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import * as actions from '../../page/actions';

class Legend extends PureComponent {
  onChangeOpacity = (currentLayer, opacity) => {
    const { setLayers, layers } = this.props;
    setLayers({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.opacity = opacity
      }
      return layer
    })})
  }

  onChangeVisibility = (currentLayer, visibility) => {
    const { setLayers, layers } = this.props;
    setLayers({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.visibility = visibility;
      }
      return layer
    })})
  }

  onChangeOrder = (layerGroupsIds) => {
    const { setLayers, layers } = this.props;
    const newLayers = layerGroupsIds.map(id => layers.find(d => d.dataset === id));
    setLayers({ layers: newLayers })
  }

  onChangeLayer = currentLayer => {
    const { setLayers, layers } = this.props;
    setLayers({ layers: layers.map(l => {
      let layer = l
      if (l.dataset === currentLayer.dataset) {
        layer.layer = currentLayer.id
      }
      return layer
    })})
  }

  onRemoveLayer = currentLayer => {
    const { setLayers } = this.props;
    const layers = this.props.layers.splice(0)
    layers.forEach((l, i) => {
      if (l.dataset === currentLayer.dataset) {
        layers.splice(i, 1);
      }
    })
    setLayers({ layers })
  }

  onChangeTimeline = (currentLayer, range) => {
    const { setLayers, layers } = this.props;
    setLayers({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.startDate = range[0];
        layer.endDate = range[1];
        layer.trimEndDate = range[2];
      }
      return layer
    })})
  }

  onChangeThreshold = (currentLayer, thresh) => {
    const { setLayers, layers } = this.props;
    setLayers({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.thresh = thresh;
      }
      return layer
    })})
  }

  render() {
    return createElement(Component, {
      ...this.props,
      onChangeOpacity: this.onChangeOpacity,
      onChangeVisibility: this.onChangeVisibility,
      onChangeOrder: this.onChangeOrder,
      onChangeLayer: this.onChangeLayer,
      onRemoveLayer: this.onRemoveLayer,
      onChangeTimeline: this.onChangeTimeline,
      onChangeThreshold: this.onChangeThreshold
    });
  }
}

export default connect(null, actions)(Legend);
