import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import { getLayerGroups, getActiveLayers } from './selectors';

const mapStateToProps = ({ search, datasets }) => ({
  ...search,
  ...datasets,
  layerGroups: getLayerGroups({ ...datasets }),
  activeLayers: getActiveLayers({ ...datasets })
});

class Container extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
  }

  handleInputChange = e => {
    const { setUrl } = this.props;
    setUrl({ apiUrl: e.target.value });
  }

  render() {
    return createElement(Component, {
      ...this.props,
      handleSubmit: this.handleSubmit,
      handleInputChange: this.handleInputChange
    });
  }
}

export default connect(mapStateToProps, null)(Container);
