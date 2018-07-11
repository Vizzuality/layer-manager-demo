import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

import Component from './component';
import * as actions from './actions';
import reducers, { initialState } from './reducers';

import './styles.css';

const mapStateToProps = ({ search }) => ({
  ...search
});

class Container extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      apiUrl: props.apiUrl
    }
  }

  handleSubmit = e => {
    const { setUrl } = this.props;
    e.preventDefault();
    setUrl({ apiUrl: this.state.apiUrl })
  }

  handleInputChange = e => {
    this.setState({ apiUrl: e.target.value });
  }

  render() {
    return createElement(Component, {
      ...this.props,
      apiUrl: this.state.apiUrl,
      handleSubmit: this.handleSubmit,
      handleInputChange: this.handleInputChange
    });
  }
}

export { actions, reducers, initialState };

export default connect(mapStateToProps, actions)(Container);
