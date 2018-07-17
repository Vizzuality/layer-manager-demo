import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import * as actions from '../../providers/datasets/actions';

class Legend extends PureComponent {
  onChangeOpacity = (currentLayer, opacity) => {
    const { setDatasets, layers } = this.props;
    setDatasets({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.opacity = opacity
      }
      return layer
    })})
  }

  onChangeVisibility = (currentLayer, visibility) => {
    const { setDatasets, layers } = this.props;
    setDatasets({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.visibility = visibility;
      }
      return layer
    })})
  }

  onChangeOrder = (layerGroupsIds) => {
    const { setDatasets, layers } = this.props;
    const newLayers = layerGroupsIds.map(id => layers.find(d => d.dataset === id));
    setDatasets({ layers: newLayers })
  }

  onChangeLayer = currentLayer => {
    const { setDatasets, layers } = this.props;
    setDatasets({ layers: layers.map(l => {
      let layer = l
      if (l.dataset === currentLayer.dataset) {
        layer.layer = currentLayer.id
      }
      return layer
    })})
  }

  onRemoveLayer = currentLayer => {
    const { setDatasets } = this.props;
    const layers = this.props.layers.splice(0)
    layers.forEach((l, i) => {
      if (l.dataset === currentLayer.dataset) {
        layers.splice(i, 1);
      }
    })
    setDatasets({ layers })
  }

  onChangeTimeline = (currentLayer, startDate, endDate) => {
    const { setDatasets, layers } = this.props;
    setDatasets({ layers: layers.map(l => {
      let layer = { ...l }
      if (l.layer === currentLayer.id) {
        layer.startDate = startDate;
        layer.endDate = endDate;
      }
      console.log(layer);
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
      onChangeTimeline: this.onChangeTimeline
    });
  }
}

export default connect(null, actions)(Legend);
