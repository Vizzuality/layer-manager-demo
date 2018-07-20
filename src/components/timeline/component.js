import React, { Component } from 'react';

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
      start,
      end,
      trim,
      handleOnChange,
      handleOnAfterChange,
      startDate,
      endDate,
      trimEndDate,
      color,
      formatDate,
      ticks,
      ...props
    } = this.props;

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
          // marks={marks}
          disabled={isPlaying}
          min={min}
          max={max}
          value={[start, end, trim]}
          {...props}
          onChange={handleOnChange}
          onAfterChange={handleOnAfterChange}
        />
      </div>
    );
  }
}

export default Timeline;
