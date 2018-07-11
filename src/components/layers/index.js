import { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import differenceBy from 'lodash/differenceBy';

import LayerManager, { PluginLeaflet } from 'layer-manager';

class LayersContainer extends PureComponent {
  componentDidMount() {
    const { map } = this.props;
    this.layerManager = new LayerManager(map, PluginLeaflet, {
      serialize: false
    });
  }

  componentWillUpdate(nextProps) {
    const { layers } = nextProps;
    const removedLayers = differenceBy(this.props.layers, layers, 'id');
    if (removedLayers && removedLayers.length) {
      this.removeLayers(removedLayers);
    }
    if (!isEqual(layers, this.props.layers)) {
      this.updateLayers(layers);
    }
  }

  removeLayers = layers => {
    this.layerManager.remove(layers.map(l => l.id));
  }

  updateLayers = (layers) => {
    if (layers && layers.length) {
      layers.forEach((l, i) => {
        this.layerManager.add([l], { ...l, zIndex: 1000 - i });
      });
    }
  }

  render() {
    return null
  }
}

export default LayersContainer;
