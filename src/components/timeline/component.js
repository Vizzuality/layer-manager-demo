import React, { Component } from 'react';
import range from 'lodash/range';

import { Range } from 'rc-slider';
import { Icon } from 'wri-api-components';

import './styles.css';

class Timeline extends Component {
  render() {
    const {
      className,
      isPlaying,
      handleTogglePlay,
      min,
      max,
      handleOnChange,
      startDate,
      endDate,
      trimEndDate,
      color,
      ...props
    } = this.props;

    // Create ticks for x axis
    const ticks = range(min, max + 1, 5);
    const marks = {};
    ticks.forEach(r => {
      marks[r] = r;
    })

    return (
      <div className={`c-timeline ${className}`}>
        <button
          className="play-btn"
          onClick={handleTogglePlay}
        >
          <Icon name={isPlaying ? 'icon-pause' : 'icon-play'} />
        </button>
        <Range
          className="range"
          marks={marks}
          disabled={isPlaying}
          min={min}
          max={max}
          value={[startDate, endDate, trimEndDate]}
          {...props}
          onChange={handleOnChange}
        />
      </div>
    );
  }
}

Timeline.defaultProps = {
  count: 2,
  trackStyle: [{ backgroundColor: 'green' }, { backgroundColor: 'light grey' }],
  handleStyle: [{ backgroundColor: 'grey' }, { display: 'none', zIndex: 1 }, { backgroundColor: 'grey', zIndex: 2 }],
  railStyle: { backgroundColor: 'grey' },
  dotStyle: { display: 'none', border: '0px' },
  pushable: true
};

export default Timeline;
