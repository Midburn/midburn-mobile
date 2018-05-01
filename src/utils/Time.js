import moment from 'moment';

export function getHourForTime(time) {
  // return moment(time, 'X').format('HH:mm');
  return moment(time, 'X').format('DD/MM HH:mm');
}
