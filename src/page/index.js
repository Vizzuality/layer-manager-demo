import { connect } from 'react-redux';

import Component from './component';
import { getLayerGroups, getActiveLayers } from './selectors';

const mapStateToProps = ({ search, datasets }) => ({
  ...search,
  ...datasets,
  layerGroups: getLayerGroups({ ...datasets }),
  activeLayers: getActiveLayers({ ...datasets })
});

export default connect(mapStateToProps, null)(Component);
