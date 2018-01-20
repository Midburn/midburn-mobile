import {Navigation}from 'react-native-navigation';
import { registerContainers } from './screens';
import SCREENS from './screens/screenNames';



// function start() {
//
//   Navigation.events().onAppLaunched(() => {
//
//     Navigation.setRoot({
//       bottomTabs: [
//         {
//           container: {
//             name: SCREENS.CAMPS,
//             navigationOptions: {
//               bottomTab: {
//                 title: 'Tab 1'
//               }
//             }
//           }
//         },
//         {
//           container: {
//             name: SCREENS.PROGRAM,
//             navigationOptions: {
//               bottomTab: {
//                 title: 'Tab 2'
//               }
//             }
//           }
//         }]});
//   });
// }

function start() {
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
