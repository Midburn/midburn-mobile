import {toLower, inRange} from 'lodash';
import {Colors} from "react-native-ui-lib";
import {getHourFromTime} from './Time';

export function getTagColor(tag) {
  const lowerCaseTag = toLower(tag);
  switch(lowerCaseTag) {
    case 'adult':
    case 'adults':
      return tagFactory('#EF5350');
    case 'hearingimpaired':
    case 'physicallydisabled':
      return tagFactory('#8D6E63');
    case 'kids':
      return tagFactory('#EC407A');
    case 'alcohol':
      return tagFactory('#AB47BC');
    case 'english':
      return tagFactory('#7E57C2');
    case 'games':
    case 'play':
      return tagFactory('#5C6BC0');
    case 'foodanddrinks':
      return tagFactory('#26A69A');
    case 'party':
      return tagFactory('#42A5F5');
    case 'creative':
      return tagFactory('#26C6DA');
    case 'live':
      return tagFactory('#66BB6A');
    case 'workshop':
      return tagFactory('#FFB300');
    case 'bodyandsoul':
      return tagFactory('#FF7043');
    case 'sleep':
      return tagFactory('#78909C');
    case 'mingling':
      return tagFactory('#C0CA33');
    default:
      return tagFactory('#000000');
  }
}

function tagFactory(color) {
  return {color, textColor: color};
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
