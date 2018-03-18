import * as store from './store'
import SCREEN_NAMES from "../../screens/screenNames";

export function loadCamps() {
  const data = require('../../../data/camps');
  store.setters.setCamps(data.ToPublish)
}

export function showCampScreen({data, navigator}) {
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {data},
    title: data.name_en
  })
}

export function applySearch(text) {
  console.log('RANG', 'applySearch', 'TBD');
}
