import {Navigation} from 'react-native-navigation';
import SCREENS from './screenNames';
import CampsScreen from './Camps';
import SecondTab from './Program';
import ArtScreen from './Art';
import ArtDetailsScreen from './Art/ArtDetailsScreen';
import ExtraScreen from './Extra';
import NowScreen from './Now';
import PrinciplesScreen from './Extra/PrinciplesScreen';
import CampDetailsScreen from './Camps/CampDetailsScreen'
import FilterTagsScreen from './FilterTags'
import OpenSourcesScreen from './Extra/OpenSourcesScreen';
import AppFeedbackScreen from './Extra/AppFeedbackScreen';
import SafetyScreen from './Extra/SafetyScreen';
import SettingsScreen from './Extra/SettingsScreen';
import CreditsScreen from './Extra/CreditsScreen';
import MapScreen from './Extra/MapScreen';
import AccessibilityMapScreen from './Extra/AccessibilityMapScreen';
import SurpriseMeScreen from './Extra/SurpriseMeScreen';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerComponent(SCREENS.CAMPS, () => CampsScreen);
  Navigation.registerComponent(SCREENS.PROGRAM, () => SecondTab);
  Navigation.registerComponent(SCREENS.ART, () => ArtScreen);
  Navigation.registerComponent(SCREENS.NOW, () => NowScreen);
  Navigation.registerComponent(SCREENS.EXTRA, () => ExtraScreen);
  Navigation.registerComponent(SCREENS.PRINCIPLES, () => PrinciplesScreen);
  Navigation.registerComponent(SCREENS.FILTER_TAGS, () => FilterTagsScreen);

  Navigation.registerComponent(SCREENS.CAMP_SCREEN, () => CampDetailsScreen);
  Navigation.registerComponent(SCREENS.ART_SCREEN, () => ArtDetailsScreen);
  Navigation.registerComponent(SCREENS.OPEN_SOURCES, () => OpenSourcesScreen);
  Navigation.registerComponent(SCREENS.APP_FEEDBACK, () => AppFeedbackScreen);
  Navigation.registerComponent(SCREENS.SAFETY, () => SafetyScreen);
  Navigation.registerComponent(SCREENS.SETTINGS, () => SettingsScreen);
  Navigation.registerComponent(SCREENS.CREDITS, () => CreditsScreen);
  Navigation.registerComponent(SCREENS.MAP, () => MapScreen);
  Navigation.registerComponent(SCREENS.MAP_ACCESSIBILITY, () => AccessibilityMapScreen);
  Navigation.registerComponent(SCREENS.SURPRISE_ME, () => SurpriseMeScreen);

}