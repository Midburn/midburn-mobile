import {getLocale} from './Strings';
import moment from 'moment';
import 'moment/locale/he'

export function getHourForTime(time) {
  // return moment(time, 'X').format('HH:mm');
  return getMomentObject(time).format('DD/MM HH:mm');
}

export function getMomentObject(time) {
  return moment(time, 'X').locale(getLocale());
}

export function getHourFromTime(time) {
  return getMomentObject(time).format('HH:mm');
}

export function getDayFromTime(time) {
  return getMomentObject(time).format('dddd DD/MM');
}
