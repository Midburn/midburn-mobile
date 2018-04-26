import {toLower} from 'lodash';
import {Colors} from "react-native-ui-lib";

export function getTagColor(tag) {

  const lowerCaseTag = toLower(tag);
  switch(lowerCaseTag) {
    case 'adult':
    case 'adults':
      return '#ff4d4d';
    case 'english':
      return '#18dcff';
    case 'alcohol':
      return '#fffa65';
    case 'servesfoodordrinks':
    case 'foodanddrinks':
    case 'physicallydisabled':
      return '#32ff7e';
    case 'kids':
    case 'bodyandsoul':
    case 'games':
      return '#ffcccc';
    case 'party':
    case 'live':
      return '#cd84f1';
    default:
      return Colors.dark70;
  }
}
