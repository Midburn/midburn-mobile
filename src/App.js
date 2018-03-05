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
        },
      {
        label: 'Program',
        screen: SCREENS.PROGRAM,
        title: 'Program',
        },
      {
        label: 'Art',
        screen: SCREENS.MAP,
        title: 'Art',
        },
      {
        label: 'Map',
        screen: SCREENS.MAP,
        title: 'Map',
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
