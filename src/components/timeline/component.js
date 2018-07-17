import React, { Component } from 'react';
import range from 'lodash/range';

import { Range } from 'rc-slider';
import { Icon } from 'wri-api-components';

import './styles.css';

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      endDate: props.activeLayer.endDate
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
    const { startDate, intEndDate } = activeLayer;
    this.interval = setInterval(() => {
      const newEndDate = this.state.endDate === intEndDate ? startDate : this.state.endDate + 1;
      this.handleChangeTimeline([startDate, newEndDate], activeLayer)
    }, 1000)
  }

  stopTimeline = () => {
    clearInterval(this.interval);
  }

  handleChangeTimeline = (range, layer) => {
    const { onChangeTimeline } = this.props;
    this.setState({ endDate: range[1] })
    onChangeTimeline(layer, range[0], range[1]);
  }

  render() {
    const { className, activeLayer } = this.props;
    const { isPlaying } = this.state;
    const { intStartDate, intEndDate, startDate, endDate } = activeLayer;
    const ticks = range(intStartDate, intEndDate + 1, 3);
    const marks = {};
    ticks.forEach(r => {
      marks[r] = r;
    })

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
          onChange={range => this.handleChangeTimeline(range, activeLayer)}
          disabled={isPlaying}
        />
      </div>
    );
  }
}

Timeline.defaultProps = {
};

export default Timeline;
