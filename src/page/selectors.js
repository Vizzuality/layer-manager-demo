import { createSelector } from 'reselect';
import flatMap from 'lodash/flatMap';

const getDatasets = state => state.datasets
const getLayers = state => state.layers

export const getLayerGroups = createSelector(
  [getDatasets, getLayers],
  (datasets, layers) => {
    if (!datasets || !datasets.length || !layers || !layers.length) return null;
    return layers.map(l => {
      const dataset = datasets.find(d => d.id === l.dataset)
      return {
        ...dataset,
        layers: dataset.layer && dataset.layer.length > 0 ? dataset.layer.map(layer => ({
          ...layer,
          opacity: l.opacity,
          visibility: l.visibility,
          active: l.layer === layer.id,
          startDate: l.startDate,
          endDate: l.endDate,
          ...layer.interactionConfig.output && layer.interactionConfig.output.length && {
            interactivity: layer.interactionConfig.output.map(i => i.column),
            events: {
              click: e => {
                console.log(e);
              }
            }
          }
        })) : []
      }
    }).filter(l => l.layers && l.layers.length > 0)
  }
)

export const getActiveLayers = createSelector(
  getLayerGroups,
  layerGroups => {
    if (!layerGroups || !layerGroups.length) return null;
    return flatMap(layerGroups, d => d.layers.filter(l => l.active));
  }
)
