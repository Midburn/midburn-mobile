import * as campsAndArtActions from './campsAndArt/actions';
import * as giftsActions from './gifts/actions';



export function loadTabsData() {
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
}
