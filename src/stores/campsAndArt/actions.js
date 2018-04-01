import * as store from './store'
import * as giftsStore from './../gifts/store'
import SCREEN_NAMES from "../../screens/screenNames";
import * as _ from 'lodash';

export function loadCamps() {
  const data = require('../../../data/2018/camps');
  store.setters.setCamps(data);
}

export function loadArt() {
  const data = require('../../../data/2018/arts');
  store.setters.setArt(data);
}

export function showCampScreen({data, navigator}) {
  const gifts = giftsStore.getters.getAllGifts();
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {
      data: _.clone(data),
      gifts
    },
    title: data.title
  })
}
