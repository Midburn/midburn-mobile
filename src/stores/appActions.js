import * as campsAndArtActions from './campsAndArt/actions';
import * as giftsActions from './gifts/actions';

export function loadTabsData() {
  campsAndArtActions.loadCamps();
  campsAndArtActions.loadArt();
  giftsActions.loadGifts();
  campsAndArtActions.setCampsGifts();
}
