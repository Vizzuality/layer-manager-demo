import { createAction } from 'redux-actions';
import { createThunkAction } from '../../redux';
import wriAPISerializer from 'wri-json-api-serializer';

export const setDatasets = createAction('setDatasets');

export const getDatasets = createThunkAction(
    'getDatasets',
    apiUrl => dispatch => {
      return fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
          const serializedDatasets = wriAPISerializer(response);
          let datasets = serializedDatasets;
          if (!Array.isArray(datasets)) {
            datasets = [datasets];
          }
          dispatch(setDatasets({ datasets: datasets.map(d => ({ ...d, dataset: d.id })) }))
          const layers = datasets.map(d => ({
            dataset: d.id,
            opacity: 1,
            visibility: true,
            layer: d.layer && d.layer.length > 0 && d.layer[0].id 
          }))
          dispatch(setDatasets({ layers }))
        })
        .catch(err => {
          console.warn(err);
        })
    }
  );