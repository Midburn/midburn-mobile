import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsScreen from './Camps';
import SecondTab from './Program';
import MapScreen from './Map';
import ArtScreen from './Art';
import ExtraScreen from './Extra';
import NowScreen from './Now';
import PrinciplesScreen from './Extra/PrinciplesScreen';
import CampDetailsScreen from './Camps/CampDetailsScreen'
import {EventDetailsModal} from './Program/EventDetailsModal';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsScreen);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.MAP, () => MapScreen);
  Navigation.registerComponent(SCREENS.ART, () => ArtScreen);
  Navigation.registerComponent(SCREENS.NOW, () => NowScreen);
  Navigation.registerComponent(SCREENS.EXTRA, () => ExtraScreen);
  Navigation.registerComponent(SCREENS.PRINCIPLES, () => PrinciplesScreen);
  
  Navigation.registerComponent(SCREENS.CAMP_SCREEN, () => CampDetailsScreen);
  Navigation.registerComponent(SCREENS.EVENT_DETAILS, () => EventDetailsModal);
}