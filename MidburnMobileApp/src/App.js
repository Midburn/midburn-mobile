

import Navigation from 'react-native-navigation';

import { registerContainers } from './screens';

// registerScreens(); // this is where you register all of your app's screens

// // start the app
// Navigation.startTabBasedApp({
//   tabs: [
//     {
//       label: 'One',
//       screen: 'example.FirstTab', // this is a registered name for a screen
//       // icon: require('../img/one.png'),
//       // selectedIcon: require('../img/one_selected.png'), // iOS only
//       title: 'Screen One'
//     },
//     // {
//     //   label: 'Two',
//     //   screen: 'example.SecondTabScreen',
//     //   icon: require('../img/two.png'),
//     //   selectedIcon: require('../img/two_selected.png'), // iOS only
//     //   title: 'Screen Two'
//     // }
//   ]
// });

registerContainers();

function start() {

  Navigation.events().onAppLaunched(() => {
    Navigation.setRoot({
      bottomTabs: [
        {
          container: {
            name: 'example.FirstTab',
            navigationOptions: {
              bottomTab: {
                title: 'Tab 1'
              }
            }
          }
        },
        {
          container: {
            name: 'example.SecondTab',
            navigationOptions: {
              bottomTab: {
                title: 'Tab 2'
              }
            }
          }
        }]});
  });
}

module.exports = {
  start
};