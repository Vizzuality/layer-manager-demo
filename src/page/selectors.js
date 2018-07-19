import { createSelector } from 'reselect';
import flatMap from 'lodash/flatMap';

import layerConfig from './customLayerConfig';

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
        ...l,
        layers: dataset.layer && dataset.layer.length > 0 ? dataset.layer.map(layer => {
          const decodeFunction = layerConfig[layer.id];
          const paramsConfig = layer.layerConfig.params_config;
          const decodeConfig = layer.layerConfig.decode_config;
          const sqlConfig = layer.layerConfig.sql_config;

          return {
            ...layer,
            ...l,
            active: l.layer === layer.id,
            ...!!paramsConfig && !!paramsConfig.length && {
              params: {
                url: layer.layerConfig.body.url || layer.layerConfig.url,
                ...paramsConfig.reduce((obj, param) => {
                  obj[param.key] = param.default;
                  return obj;
                }, {}),
                ...l.params
              }
            },
            ...!!sqlConfig && !!sqlConfig.length && {
              sqlParams: {
                ...sqlConfig.reduce((obj, param) => {
                  obj[param.key] = param.default;
                  return obj;
                }, {}),
                ...l.decodeParams
              },
              ...l.sqlParams
            },
            ...!!decodeConfig && !!decodeConfig.length && {
              decodeFunction,
              decodeParams: {
                ...decodeConfig.reduce((obj, param) => {
                  obj[param.key] = param.default;
                  return obj;
                }, {}),
                ...l.decodeParams
              }
            },
            // ...!!decodeConfig && {
            //   decodeFunction,
            //   decodeParams: {
            //     startDate: l.startDate || decode.decodeParams.startDate,
            //     endDate: l.endDate || decode.decodeParams.endDate
            //   },
            //   startDate: l.startDate || decode.decodeParams.startDate,
            //   endDate: l.endDate || decode.decodeParams.endDate,
            //   minDate: decode.decodeParams.startDate,
            //   maxDate: decode.decodeParams.endDate,
            //   trimEndDate: l.trimEndDate || l.endDate || decode.decodeParams.endDate,
            //   thresh: l.thresh || layer.layerConfig.body.options.threshold
            // }
          }
        }) : []
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
