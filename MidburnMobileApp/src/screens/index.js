import Navigation from 'react-native-navigation';
import FirstTab from './FirstTab';
import SecondTab from './SecondTab';

// register all screens of the app (including internal ones)
export function registerContainers() {
  Navigation.registerContainer('example.FirstTab', () => FirstTab);
  Navigation.registerContainer('example.SecondTab', () => SecondTab);
}