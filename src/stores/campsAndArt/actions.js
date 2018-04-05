import * as store from './store'
import * as giftsStore from './../gifts/store'
import SCREEN_NAMES from "../../screens/screenNames";
import _ from 'lodash';

export function loadCamps() {
  const data = require('../../../data/2018/camps');
  store.setters.setCamps(data);
}

export function loadArt() {
  const data = require('../../../data/2018/arts');
  store.setters.setArt(data);
}

export function showCampScreen({data, navigator}) {
  const campId = _.get(data, 'campId');
  const gifts = giftsStore.getters.getGiftsForCampId(campId);
  const title = _.get(data, 'title');
  const description = _.get(data, 'description');
  const tags = _.get(data, 'tags');
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {
      title,
      description,
      tags,
      gifts
    },
    title
  });
}

export function showFavouritesScreen(navigator, screen, renderRow, onRowPressed) {

  navigator.showModal({
    screen: SCREEN_NAMES.FAVOURITES,
    passProps: {
      data: store.getters.getCampsDataToShow(),
      renderRow,
      onRowPressed
    }

  })
}

