import { PureComponent } from 'react';

class LayerContainer extends PureComponent {
  componentDidMount() {
    const { layerManager, ...options } = this.props;
    layerManager.add([options], options)
  }

  componentDidUpdate() {
    const { layerManager, ...options } = this.props;
    layerManager.add([options], options);
  }

  componentWillUnmount() {
    const { layerManager, id } = this.props;
    layerManager.remove(id);
  }

  render() {
    return null;
  }
}

export default LayerContainer;
