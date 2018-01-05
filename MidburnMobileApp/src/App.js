import Navigation from 'react-native-navigation';
import { registerContainers } from './screens';
import SCREENS from './screens/screenNames';



function start() {

  Navigation.events().onAppLaunched(() => {
    registerContainers();
    Navigation.setRoot({
      bottomTabs: [
        {
          container: {
            name: SCREENS.CAMPS,
            navigationOptions: {
              bottomTab: {
                title: 'Tab 1'
              }
            }
          }
        },
        {
          container: {
            name: SCREENS.PROGRAM,
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