const DeviceInfo = require('react-native-device-info');
const DEFAULT_LOCALE = 'en';

let locale;

export function getLocale() {
  if (!locale) {
    locale = DeviceInfo.getDeviceLocale().slice(0, 2);
  }
  locale = locale === 'he' ? 'he' : DEFAULT_LOCALE;

  return locale;
}

export function isRTL() {
  return getLocale() === 'he';
}

function init(stringsValue) {
  return (key, params) => {
    let locale = getLocale();
    const string = stringsValue[key][locale];
    const msg = string ? string : key;
    return applyParams(msg, params);
  }
};

function applyParams(str, params) {
  if (params) {
    Object.keys(params).forEach((paramName) => {
      str = str.replace(new RegExp(`{{${paramName}}}`, 'g'), params[paramName]);
    });
  }
  return str;
}

export function getString(stringHeb, stringEn) {
  return isRTL() ? stringHeb : stringEn;
}

const stringsValue = require('./values.json');

export default init(stringsValue);
