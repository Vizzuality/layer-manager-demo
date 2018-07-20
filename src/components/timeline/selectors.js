import { createSelector } from 'reselect';
import moment from 'moment';
import range from 'lodash/range';

const getDates = state => state.dates;

export const getDatesAsNumbers = createSelector(
  getDates,
  dates => {
    if (!dates) return null;
    const { minDate, maxDate, startDate, endDate, trimEndDate } = dates;
    return {
      min: 0,
      max: moment(maxDate).diff(minDate, 'days'),
      start: moment(startDate).diff(minDate, 'days'),
      end: moment(endDate).diff(minDate, 'days'),
      trim: moment(trimEndDate).diff(minDate, 'days')
    };
  }
);

export const getTicks = createSelector(
  getDates,
  dates => {
    if (!dates) return null;
    // const { minDate, maxDate } = dates;
    // console.log(minDate, maxDate);
    // const ticks = range(minDate, maxDate + 1, 3);
    // const marks = {};
    // ticks.forEach(r => {
    //   marks[r] = r;
    // })
    // return marks;
  }
);




