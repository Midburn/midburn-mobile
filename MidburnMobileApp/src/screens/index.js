import Navigation from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsTab from './CampsTab';
import SecondTab from './ProgramTab';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerContainer(SCREENS.CAMPS, () => CampsTab);
  Navigation.registerContainer(SCREENS.PROGRAM, () => SecondTab);
}