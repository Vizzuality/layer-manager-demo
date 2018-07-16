import { createAction } from 'redux-actions';
import { createThunkAction } from '../../redux';
import wriAPISerializer from 'wri-json-api-serializer';
import { setInteraction } from '../../components/map/components/popup/actions';

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
          datasets = datasets.map(d => ({
            ...d,
            dataset: d.id,
            layer: d.layer.map(l => ({
              ...l,
              ...l.interactionConfig.output && l.interactionConfig.output.length && {
                interactivity: l.interactionConfig.output.map(i => i.column),
                events: {
                  click: e => {
                    dispatch(setInteraction({
                      ...e,
                      label: l.name,
                      id: l.id,
                      config: l.interactionConfig.output
                    }))
                  }
                }
              }
            }))
          }))
          dispatch(setDatasets({ datasets: datasets.map(d => ({ ...d, dataset: d.id })) }))
          const layers = datasets.map(d => ({
            dataset: d.id,
            opacity: 1,
            visibility: true,
            layer: d.layer && d.layer.length > 0 && d.layer[0].id,
            startDate: 2001,
            endDate: 2016
          }))
          dispatch(setDatasets({ layers }))
        })
        .catch(err => {
          console.warn(err);
        })
    }
  );
