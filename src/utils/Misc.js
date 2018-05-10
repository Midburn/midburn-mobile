import * as DeviceInfo from 'react-native-device-info/deviceinfo';

export function appVersionNumber() {
  return DeviceInfo.getVersion();
}