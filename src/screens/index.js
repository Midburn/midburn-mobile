import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsTab from './CampsTab';
import SecondTab from './ProgramTab';
import MapTab from './MapTab';
import ArtTab from './ArtTab';
import InfoTab from './InfoTab';
import PrinciplesScreen from './InfoTab/PrinciplesScreen';
import CampScreen from './CampsTab/CampScreen'

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsTab);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.MAP, () => MapTab);
  Navigation.registerComponent(SCREENS.ART, () => ArtTab);
  Navigation.registerComponent(SCREENS.INFO, () => InfoTab);
  Navigation.registerComponent(SCREENS.PRINCIPLES, () => PrinciplesScreen);

  Navigation.registerComponent(SCREENS.CAMP_SCREEN, () => CampScreen);
}