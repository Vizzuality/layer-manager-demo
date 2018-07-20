import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import isEqual from 'lodash/isEqual';

import TimelineComponent from './component';
import { getTicks, getDatesAsNumbers } from './selectors';

import './styles.css';

const mapStateToProps = (state, { maxDate, minDate, startDate, endDate, trimEndDate, ...props }) => {
  const dates = {
    maxDate, minDate, startDate, endDate, trimEndDate
  };
  return {
    ticks: getTicks({ dates }),
    ...props
  }
};

class TimelineContainer extends PureComponent {
  constructor(props) {
    super(props)
    const { minDate, maxDate, startDate, endDate, trimEndDate } = props;
    this.state = {
      isPlaying: false,
      min: 0,
      max: moment(maxDate).diff(minDate, 'days'),
      start: moment(startDate).diff(minDate, 'days'),
      end: moment(endDate).diff(minDate, 'days'),
      trim: moment(trimEndDate).diff(minDate, 'days')
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { isPlaying, end } = nextState;
    if (isPlaying && isPlaying !== this.state.isPlaying) {
      this.startTimeline();
    }
    if (!isPlaying && isPlaying !== this.state.isPlaying) {
      this.stopTimeline();
    }
    if (isPlaying && !isEqual(end, this.state.end)) {
      this.incrementTimeline(nextState);
    }
  }

  incrementTimeline = nextState => {
    const { speed, minDate, intervalStep, interval } = this.props;
    const { start, end, trim } = nextState;
    this.interval = setTimeout(() => {
      const currentEndDate = moment(minDate).add(end, 'days').format('YYYY-MM-DD');
      let newEndDate = moment(currentEndDate).add(intervalStep, interval).format('YYYY-MM-DD')
      newEndDate = moment(newEndDate).diff(minDate, 'days');
      if (end === trim) {
        newEndDate = start;
      } else if (newEndDate >= trim) {
        newEndDate = trim;
      }
      this.handleOnChange([start, newEndDate, trim])
      this.handleOnAfterChange([start, newEndDate, trim])
    }, speed);
  }

  startTimeline = () => {
    this.incrementTimeline(this.state);
  }

  stopTimeline = () => {
    clearInterval(this.interval);
  }

  handleTogglePlay = () => {
    const { isPlaying } = this.state;
    this.setState({ isPlaying: !isPlaying })
  }

  handleOnChange = range => {
    this.setState({ start: range[0], end: range[1], trim: range[2] });
  }

  handleOnAfterChange = range => {
    const { handleChange } = this.props;
    const newRange = this.formatRange(range);
    handleChange(newRange)
  }

  formatRange = range => {
    const { dateFormat, minDate } = this.props;
    return range.map(r => moment(minDate).add(r ,'days').format(dateFormat));
  }

  render() {
    return createElement(TimelineComponent, {
      ...this.props,
      ...this.state,
      startTimeline: this.startTimeline,
      stopTimeline: this.stopTimeline,
      handleTogglePlay: this.handleTogglePlay,
      handleOnChange: this.handleOnChange,
      handleOnAfterChange: this.handleOnAfterChange,
      formatDate: this.formatDate
    });
  }
}

TimelineContainer.defaultProps = {
  dateFormat: 'YYYY-MM-DD',
  interval: 'years',
  intervalStep: 1,
  speed: 200,
  count: 2,
  trackStyle: [{ backgroundColor: 'green' }, { backgroundColor: 'light grey' }],
  handleStyle: [{ backgroundColor: 'grey' }, { zIndex: 1 }, { backgroundColor: 'grey', zIndex: 2 }],
  railStyle: { backgroundColor: 'grey' },
  dotStyle: { display: 'none', border: '0px' },
  pushable: true
}

export default connect(mapStateToProps, null)(TimelineContainer);
