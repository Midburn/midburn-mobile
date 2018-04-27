import moment from 'moment';

export function getHourForTime(time) {
  // return moment(time, 'X').format('HH:mm');
  return moment(time, 'X').format('MM/DD HH:mm');
  // return moment(time, 'X').fromNow();
}