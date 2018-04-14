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

export function showCampScreen({campId, navigator}) {
  const camp = store.getters.getCampForId(campId);
  const title = _.get(camp, 'campName');
  const description = _.get(camp, 'description');
  const tags = _.get(camp, 'tags');
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {
      title,
      description,
      tags,
      campId
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

export function setCampsGifts() {
  const camps = store.getters.getCamps();
  const gifts = giftsStore.getters.getAllGifts();

  _.forEach(camps, (camp) => {
    const campGifts = [];
    const giftsIdsArray = _.get(camp, 'gifts');
    _.forEach(gifts, (gift) => {
      if (_.includes(giftsIdsArray, gift.giftId)) {
        campGifts.push(gift);
      }
    });
    store.setters.setGiftForCamp(camp.campId, campGifts);
  });
}

