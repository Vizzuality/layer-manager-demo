import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import * as actions from './actions';
import reducers, { initialState } from './reducers';

import './styles.scss';

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

export { actions, reducers, initialState };

export default connect(null, actions)(Container);
