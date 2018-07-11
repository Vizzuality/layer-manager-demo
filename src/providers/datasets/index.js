import { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';

import * as actions from './actions';
import reducers, { initialState } from './reducers';

class DatasetsContainer extends PureComponent {
  componentDidMount() {
    const { getDatasets, apiUrl } = this.props;
    getDatasets(apiUrl);
  }

  componentWillUpdate(nextProps) {
    const { apiUrl, getDatasets, setDatasets } = nextProps;
    if (!isEqual(apiUrl, this.props.apiUrl)) {
      setDatasets({ datasets: [], layers: [] })
      getDatasets(apiUrl);
    }
  }

  render() {
    return null
  }
}

export { actions, reducers, initialState }

export default connect(null, actions)(DatasetsContainer);
