/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from './redux';

import * as Search from './components/search';
import * as Datasets from './providers/datasets';

const componentsReducers = {
  search: handleActions(Search)
};

const providersReducers = {
  datasets: handleActions(Datasets)
}

export default combineReducers({
  ...componentsReducers,
  ...providersReducers
});
