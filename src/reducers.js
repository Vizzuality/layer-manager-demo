/* eslint-disable import/first */
import { combineReducers } from 'redux';
import { handleActions } from './redux';

import * as App from './page/index';

const componentsReducers = {
  app: handleActions(App)
};

export default combineReducers({
  ...componentsReducers
});
