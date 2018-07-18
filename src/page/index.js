import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import PageComponent from './component';
import { getLayerGroups, getActiveLayers } from './selectors';

import * as actions from './actions';
import reducers, { initialState } from './reducers';

const mapStateToProps = ({ search, datasets, page }) => ({
  ...search,
  ...datasets,
  ...page,
  layerGroups: getLayerGroups({ ...datasets, ...page }),
  activeLayers: getActiveLayers({ ...datasets, ...page })
});

class PageContainer extends PureComponent {
  componentWillUpdate(nextProps) {
    const { datasets, setLayers } = nextProps;
    if (!isEqual(datasets, this.props.datasets)) {
      const layers = datasets.map(d => ({
        dataset: d.id,
        opacity: 1,
        visibility: true,
        layer: d.layer && d.layer.length > 0 && d.layer[0].id
      }))
      setLayers({ layers });
    }
  }

  render() {
    return createElement(PageComponent, {
      ...this.props
    });
  }
}

export { actions, reducers, initialState }

export default connect(mapStateToProps, actions)(PageContainer);
