import {AsyncStorage, Alert, BackHandler} from 'react-native';
import * as campsAndArtActions from './campsAndArt/actions';
import * as giftsActions from './gifts/actions';
import Strings from "../utils/Strings";

const APP_LANGUAGE_STORAGE_KEY = '@midburn_language:key';


export async function loadTabsData() {
  const {setLocale} = require('../utils/Strings');
  const savedAppLanguage = await getFromAsyncStorage(APP_LANGUAGE_STORAGE_KEY);
  if (savedAppLanguage) {
    setLocale(savedAppLanguage);
  }

  campsAndArtActions.loadCamps();
  campsAndArtActions.loadArt();
  giftsActions.loadGifts();
  giftsActions.loadOurLove();
  campsAndArtActions.setCampsGifts();
  campsAndArtActions.loadCampTags();
  giftsActions.loadGiftsTags();
}

export function setAppLanguage(languageId) {
  const {setLocale, getLocale} = require('../utils/Strings');
  const {start} = require('../App');

  if (getLocale() === languageId) {
    Alert.alert(
      '',
      '🤷‍♂️🤷‍♀️️',
      [
        {text: '🦄'},
      ],
      { cancelable: false }
    );
    return;
  }
  setLocale(languageId);
  campsAndArtActions.loadCamps();
  campsAndArtActions.loadArt();

  start(false);

  saveToAsyncStorage(APP_LANGUAGE_STORAGE_KEY, languageId);
}

export async function saveToAsyncStorage(key, localeString) {
  if (!localeString) {
    return;
  }
  try {
    await AsyncStorage.setItem(key, localeString);
  } catch (error) {
    console.warn('ERROR - Failed to save to Async Storage');
  }
}

export async function getFromAsyncStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null){
      return value;
    }
  } catch (error) {
    console.warn('ERROR - Failed to get from Async Storage');
  }
}

export function backToNowTab(navigator) {
    navigator.switchToTab({
      tabIndex: 0
    });
    return true;
}

export function exitApp() {
  Alert.alert(
    Strings('ANDROID_ALERT_TITLE'),
    Strings('ANDROID_ALERT_MESSAGE'),
    [
      {text: Strings('ANDROID_ALERT_STAY'), style: 'cancel'},
      {text: Strings('ANDROID_ALERT_LEAVE'), onPress: () => {
          BackHandler.exitApp();
        }},
    ],
    {cancelable: true}
  );

  return true;
}

