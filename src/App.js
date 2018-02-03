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
        },
      {
        label: 'PROGRAM',
        screen: SCREENS.PROGRAM,
        title: 'PROGRAM',
        },
      {
        label: 'ART',
        screen: SCREENS.MAP,
        title: 'ART',
        },
      {
        label: 'MAP',
        screen: SCREENS.MAP,
        title: 'MAP',
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
