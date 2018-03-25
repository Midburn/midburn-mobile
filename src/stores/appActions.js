import * as campsActions from './camps/actions';
import * as giftsActions from './gifts/actions';

export function loadTabsData() {
  campsActions.loadCamps();
  giftsActions.loadGifts();
}