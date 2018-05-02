import moment from 'moment';

export function getHourForTime(time) {
  // return moment(time, 'X').format('HH:mm');
  return getMomentObject(time).format('DD/MM HH:mm');
}

export function getMomentObject(time) {
  return moment(time, 'X');
}

export function getHourFromTime(time) {
  return getMomentObject(time).hour();
}