import { createElement, PureComponent } from 'react';

import TimelineComponent from './component';

import './styles.css';

class TimelineContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      endDate: props.value[1]
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { isPlaying } = nextState;
    if (isPlaying && isPlaying !== this.state.isPlaying) {
      this.startTimeline();
    }
    if (!isPlaying && isPlaying !== this.state.isPlaying) {
      this.stopTimeline();
    }
  }

  startTimeline = () => {
    const { value: [startDate, endDate, trimEndDate], interval } = this.props;
    this.interval = setInterval(() => {
      const newEndDate = this.state.endDate === trimEndDate ? startDate : this.state.endDate + 1;
      this.handleOnChange([startDate, newEndDate, trimEndDate])
    }, interval || 500)
  }

  stopTimeline = () => {
    clearInterval(this.interval);
  }

  handleTogglePlay = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying })
  }

  handleOnChange = range => {
    const { onChange } = this.props;
    onChange(range)
    this.setState({ endDate: range[1] });
  }

  render() {
    return createElement(TimelineComponent, {
      ...this.props,
      ...this.state,
      startTimeline: this.startTimeline,
      stopTimeline: this.stopTimeline,
      handleTogglePlay: this.handleTogglePlay,
      handleOnChange: this.handleOnChange
    });
  }
}

export default TimelineContainer
