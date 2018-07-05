import { createSelector } from 'reselect';
import flatten from 'lodash/flatten';

const getDatasets = state => state.datasets
const getLayers = state => state.layers

export const getLayerGroups = createSelector(
  [getDatasets, getLayers],
  (datasets, layers) => {
    if (!datasets && !datasets.length) return null
    return layers.map(l => {
      const dataset = datasets.find(d => d.id === l.dataset)
      return {
        ...dataset,
        layers: dataset.layer.map(layer => ({
          ...layer,
          opacity: l.opacity,
          visible: l.visible,
          active: l.layer === layer.id
        }))
      }
    })
  }
)

export const getActiveLayers = createSelector(
  getLayerGroups,
  layerGroups => {
    if (!layerGroups || !layerGroups.length) return null;
    return flatten(layerGroups.map(d => d.layers)).filter(l => l.active);
  }
)
