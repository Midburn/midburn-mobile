import {Navigation}from 'react-native-navigation';
import {registerContainers} from './screens';
import SCREENS from './screens/screenNames';
import * as appActions from './stores/appActions';
import Strings from './utils/Strings';
import SplashScreen from 'react-native-splash-screen'


function start(shouldLoad = true) {
  if (shouldLoad) {
    appActions.loadTabsData();
    registerContainers();
  }

  SplashScreen.hide();

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: Strings('NOW'),
        screen: SCREENS.NOW,
        title: Strings('NOW'),
        icon: require('../data/img/open-book.png')
      },
      {
        label: Strings('CAMPS'),
        screen: SCREENS.CAMPS,
        title: Strings('CAMPS'),
        icon: require('../data/img/campfire.png')
      },
      {
        label: Strings('ART'),
        screen: SCREENS.ART,
        title: Strings('ART'),
        icon: require('../data/img/masks.png')
      },
      {
        label: Strings('PROGRAM'),
        screen: SCREENS.PROGRAM,
        title: Strings('PROGRAM'),
        icon: require('../data/img/open-book.png')
      },
      {
        label: Strings('EXTRA'),
        screen: SCREENS.EXTRA,
        title: Strings('EXTRA'),
        icon: require('../data/img/more.png')
      }

    ],
    tabsStyle: {},
    appStyle: {}
  });
}

module.exports = {
  start
};
