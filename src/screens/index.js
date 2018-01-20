import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsTab from './CampsTab';
import SecondTab from './ProgramTab';
import MapTab from './MapTab';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsTab);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.MAP, () => MapTab);
}