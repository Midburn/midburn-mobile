import {toLower, inRange} from 'lodash';
import {Colors} from "react-native-ui-lib";
import {getHourFromTime} from './Time';

export function getTagColor(tag) {
  const lowerCaseTag = toLower(tag);
  switch(lowerCaseTag) {
    case 'adult':
    case 'adults':
      return tagFactory('#ff4d4d30', Colors.black);
    case 'english':
      return tagFactory('#18dcff30', Colors.black);
    case 'alcohol':
      return tagFactory('#fffa6530', Colors.black);
    case 'servesfoodordrinks':
    case 'foodanddrinks':
    case 'physicallydisabled':
      return tagFactory('#32ff7e30', Colors.black);
    case 'kids':
    case 'bodyandsoul':
    case 'games':
      return tagFactory('#ffcccc30', Colors.black);
    case 'party':
    case 'live':
      return tagFactory('#cd84f130', Colors.black);
    default:
      return tagFactory('#E0E3E530', Colors.black);
  }
}

function tagFactory(color, textColor) {
  return {color, textColor};
}


export function getColorForTime(time) {
  const hour = getHourFromTime(time);
  if (inRange(hour, 0, 6)) {
    return '#8e44ad'
  } else if (inRange(hour, 6, 12)) {
    return '#3498db';
  } else if (inRange(hour, 12, 18)) {
    return '#f1c40f';
  } else if (inRange(hour, 18, 24)) {
    return '#c0392b';
  } else {
    return '#34495e';
  }
}