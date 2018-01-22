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
        label: 'CAMPS',
        screen: SCREENS.CAMPS,
        title: 'CAMPS',
        navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
        navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
      },
      {
        label: 'CAMPS',
        screen: SCREENS.CAMPS,
        title: 'CAMPS',
        navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
        navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
      },
    ],
    tabsStyle: {},
    appStyle: {
    }
  });
}

module.exports = {
  start
};
