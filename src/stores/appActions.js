import {AsyncStorage} from 'react-native';
import * as campsAndArtActions from './campsAndArt/actions';
import * as giftsActions from './gifts/actions';

const APP_LANGUAGE_STORAGE_KEY = '@midburn_language:key';


export async function loadTabsData() {
  const {setLocale} = require('../utils/Strings');
  const savedAppLanguage = await getAppLanguageToAsyncStorage(APP_LANGUAGE_STORAGE_KEY);
  if (savedAppLanguage) {
    setLocale(savedAppLanguage);
  }

  campsAndArtActions.loadCamps();
  campsAndArtActions.loadArt();
  giftsActions.loadGifts();
  campsAndArtActions.setCampsGifts();


}

export function setAppLanguage(languageId) {
  const {setLocale} = require('../utils/Strings');
  const {start} = require('../App');
  setLocale(languageId);
  campsAndArtActions.loadCamps();
  campsAndArtActions.loadArt();

  start(false);

  saveAppLanguageToAsyncStorage(APP_LANGUAGE_STORAGE_KEY, languageId);
}

export async function saveAppLanguageToAsyncStorage(key, localeString) {
  if (!localeString) {
    return;
  }
  try {
    await AsyncStorage.setItem(key, localeString);
  } catch (error) {
    console.warn('ERROR - Failed to save to Async Storage');
  }
}

export async function getAppLanguageToAsyncStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null){
      return value;
    }
  } catch (error) {
    console.warn('ERROR - Failed to get from Async Storage');

  }
}


