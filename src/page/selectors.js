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
        opacity: l.opacity,
        visibility: l.visibility,
        layers: dataset.layer && dataset.layer.length > 0 ? dataset.layer.map(layer => ({
          ...layer,
          opacity: l.opacity,
          visibility: l.visibility,
          active: l.layer === layer.id,
          intStartDate: 2001,
          intEndDate: 2016,
          startDate: l.startDate,
          endDate: l.endDate,
          trimEndDate: l.trimEndDate || l.endDate,
          thresh: l.thresh || 30,
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
