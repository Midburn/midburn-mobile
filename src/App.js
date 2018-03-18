import {Navigation}from 'react-native-navigation';
import { registerContainers } from './screens';
import SCREENS from './screens/screenNames';
import * as appActions from './stores/appActions';


function start() {
  appActions.loadTabsData();
  registerContainers();
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Camps',
        screen: SCREENS.CAMPS,
        title: 'Camps',
        icon: require('../data/img/campfire.png')
      },

      {
        label: 'Art',
        screen: SCREENS.ART,
        title: 'Art',
        icon: require('../data/img/paint.png')
      },
      {
        label: 'Now',
        screen: SCREENS.NOW,
        title: 'Now',
        icon: require('../data/img/open-book.png')
      },
      {
        label: 'Program',
        screen: SCREENS.PROGRAM,
        title: 'Program',
        icon: require('../data/img/open-book.png')
      },
      {
        label: 'Extra',
        screen: SCREENS.EXTRA,
        title: 'Extra',
      }

    ],
    tabsStyle: {},
    appStyle: {
    }
  });
}

module.exports = {
  start
};
