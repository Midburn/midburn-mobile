import {Navigation}from 'react-native-navigation';
import {registerContainers} from './screens';
import SCREENS from './screens/screenNames';
import * as appActions from './stores/appActions';
import Strings from './utils/Strings';
import SplashScreen from 'react-native-splash-screen'
import {AppState} from 'react-native';
import * as store from './stores/gifts/store';


async function start(shouldLoad = true) {
  if (shouldLoad) {
    await appActions.loadTabsData();
    registerContainers();
  }

  store.setters.setCurrentTime();

  AppState.addEventListener('change', (event) => {
    if (event === 'active') {
      store.setters.setCurrentTime();
    }
  });

  SplashScreen.hide();


  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [{
                component: {
                  name: SCREENS.NOW
                }
              }],
              options: {
                bottomTab: {
                  text: Strings('NOW'),
                  icon: require('../data/img/time.png'),
                }
              }
            }
          },
          {
            stack: {
              children: [{
                component: {
                  name: SCREENS.CAMPS
                }
              }],
              options: {
                bottomTab: {
                  text: Strings('CAMPS'),
                  icon: require('../data/img/camp.png'),
                }
              }
            }
          },
          {
            stack: {
              children: [{
                component: {
                  name: SCREENS.ART
                }
              }],
              options: {
                bottomTab: {
                  text: Strings('ART'),
                  icon: require('../data/img/art.png'),
                }
              }
            }
          },

          {
            stack: {
              children: [{
                component: {
                  name: SCREENS.PROGRAM
                }
              }],
              options: {
                bottomTab: {
                  text: Strings('PROGRAM'),
                  icon: require('../data/img/program.png'),
                }
              }
            }
          },
          {
            stack: {
              children: [{
                component: {
                  name: SCREENS.EXTRA
                }
              }],
              options: {
                bottomTab: {
                  text: Strings('EXTRA'),
                  icon: require('../data/img/more.png'),
                }
              }
            }
          }
          ]
      }
    }
  });

//   Navigation.startTabBasedApp({
//     tabs: [
//       {
//         label: Strings('NOW'),
//         screen: SCREENS.NOW,
//         title: Strings('NOW'),
//         icon: require('../data/img/time.png')
//       },
//       {
//         label: Strings('CAMPS'),
//         screen: SCREENS.CAMPS,
//         title: Strings('CAMPS'),
//         icon: require('../data/img/camp.png')
//       },
//       {
//         label: Strings('ART'),
//         screen: SCREENS.ART,
//         title: Strings('ART'),
//         icon: require('../data/img/art.png')
//       },
//       {
//         label: Strings('PROGRAM'),
//         screen: SCREENS.PROGRAM,
//         title: Strings('PROGRAM'),
//         icon: require('../data/img/program.png')
//       },
//       {
//         label: Strings('EXTRA'),
//         screen: SCREENS.EXTRA,
//         title: Strings('EXTRA'),
//         icon: require('../data/img/more.png')
//       }
//
//     ],
//     tabsStyle: {},
//     appStyle: {}
//   });
}

module.exports = {
  start
};

