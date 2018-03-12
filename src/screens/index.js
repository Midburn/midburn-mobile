import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsTab from './Camps';
import SecondTab from './Program';
import MapTab from './Map';
import ArtTab from './Art';
import ExtraTab from './Extra';
import PrinciplesScreen from './Extra/PrinciplesScreen';
import CampScreen from './Camps/CampScreen'

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsTab);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.MAP, () => MapTab);
  Navigation.registerComponent(SCREENS.ART, () => ArtTab);
  Navigation.registerComponent(SCREENS.EXTRA, () => ExtraTab);
  Navigation.registerComponent(SCREENS.PRINCIPLES, () => PrinciplesScreen);

  Navigation.registerComponent(SCREENS.CAMP_SCREEN, () => CampScreen);
}