import { createSelector } from 'reselect';
import flatMap from 'lodash/flatMap';

import decodeFuncs from './decode.js';

const getDatasets = state => state.datasets
const getLayers = state => state.layers

const decodeLayerKeys = Object.keys(decodeFuncs);

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
          ...!!decodeLayerKeys.indexOf(layer.id) > -1 && {
            tileId: '{x}_{y}_{z}_{thresh}',
            tileParams: { url: layer.layerConfig.body.url, thresh: l.thresh, dataMaxZoom: layer.layerConfig.body.options.dataMaxZoom },
            decodeParams: { startDate: l.startDate, endDate: l.endDate },
            decodeFunction: decodeFuncs[layer.id]
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
