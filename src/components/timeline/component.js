import React, { Component } from 'react';
import { Range } from 'rc-slider';
import { Icon } from 'wri-api-components';

import './styles.css';

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      startDate: props.activeLayer.startDate
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { isPlaying } = nextState;
    const { activeLayer } = nextProps;
    if (isPlaying && isPlaying !== this.state.isPlaying) {
      this.startTimeline(activeLayer);
    }
    if (!isPlaying && isPlaying !== this.state.isPlaying) {
      this.stopTimeline();
    }
  }

  startTimeline = activeLayer => {
    const { endDate, intStartDate } = activeLayer;
    this.interval = setInterval(() => {
      const newStartDate = this.state.startDate === endDate ? intStartDate : this.state.startDate + 1;
      this.handleChangeTimeline([newStartDate, endDate], activeLayer)
    }, 1000)
  }

  stopTimeline = () => {
    clearInterval(this.interval);
  }

  handleChangeTimeline = (range, layer) => {
    const { onChangeTimeline } = this.props;
    this.setState({ startDate: range[0] })
    onChangeTimeline(layer, range[0], range[1]);
  }

  render() {
    const { className, activeLayer } = this.props;
    const { isPlaying } = this.state;
    const { intStartDate, intEndDate, startDate, endDate } = activeLayer;
    const marks = {
      [intStartDate]: intStartDate,
      [intEndDate]: intEndDate
    }

    return (
      <div className={`c-timeline ${className}`}>
        <button
          className="play-btn"
          onClick={() => {
            this.setState({ isPlaying: !isPlaying })
          }}
        >
          <Icon name={isPlaying ? 'icon-pause' : 'icon-play'} />
        </button>
        <Range
          className="range"
          value={[startDate, endDate]}
          min={intStartDate}
          max={intEndDate}
          marks={marks}
          onChange={range => this.handleChangeTimeline(range, activeLayer)} />
      </div>
    );
  }
}

Timeline.defaultProps = {
};

export default Timeline;
