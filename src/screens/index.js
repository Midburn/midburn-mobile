import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsScreen from './Camps';
import SecondTab from './Program';
import MapScreen from './Map';
import ArtScreen from './Art';
import ArtDetailsScreen from './Art/ArtDetailsScreen';
import ExtraScreen from './Extra';
import NowScreen from './Now';
import PrinciplesScreen from './Extra/PrinciplesScreen';
import CampDetailsScreen from './Camps/CampDetailsScreen'
import FilterTagsScreen from './FilterTags'
import FavouritesScreen from './Favourites'
import OpenSourcesScreen from './Extra/OpenSourcesScreen';
import AppFeedbackScreen from './Extra/AppFeedbackScreen';
import SafetyScreen from './Extra/SafetyScreen';
import SettingsScreen from './Extra/SettingsScreen';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsScreen);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.MAP, () => MapScreen);
  Navigation.registerComponent(SCREENS.ART, () => ArtScreen);
  Navigation.registerComponent(SCREENS.NOW, () => NowScreen);
  Navigation.registerComponent(SCREENS.EXTRA, () => ExtraScreen);
  Navigation.registerComponent(SCREENS.PRINCIPLES, () => PrinciplesScreen);
  Navigation.registerComponent(SCREENS.FILTER_TAGS, () => FilterTagsScreen);
  Navigation.registerComponent(SCREENS.FAVOURITES, () => FavouritesScreen);

  Navigation.registerComponent(SCREENS.CAMP_SCREEN, () => CampDetailsScreen);
  Navigation.registerComponent(SCREENS.ART_SCREEN, () => ArtDetailsScreen);
  Navigation.registerComponent(SCREENS.OPEN_SOURCES, () => OpenSourcesScreen);
  Navigation.registerComponent(SCREENS.APP_FEEDBACK, () => AppFeedbackScreen);
  Navigation.registerComponent(SCREENS.SAFETY, () => SafetyScreen);
  Navigation.registerComponent(SCREENS.SETTINGS, () => SettingsScreen);
}