import { createAction } from 'redux-actions';
import { createThunkAction } from '../redux';
import wriAPISerializer from 'wri-json-api-serializer';

export const setData = createAction('setData');

export const getDatasets = createThunkAction(
    'getDatasets',
    apiUrl => dispatch => {
        fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
          const serializedDatasets = wriAPISerializer(response);
          let datasets = serializedDatasets;
          if (!Array.isArray(datasets)) {
            datasets = [datasets];
          }
          dispatch(setData({ datasets: datasets.map(d => ({ ...d, dataset: d.id })) }))
          const layers = datasets.map(d => ({
            dataset: d.id,
            opacity: 1,
            visible: true,
            layer: d.layer && d.layer.length > 0 && d.layer[0].id 
          }))
          dispatch(setData({ layers }))
        })
        .catch(err => {
          console.warn(err);
        })
    }
  );
