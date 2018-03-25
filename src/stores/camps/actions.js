import * as store from './store'
import SCREEN_NAMES from "../../screens/screenNames";
import * as _ from 'lodash';

export function loadCamps() {
  const data = require('../../../data/2018/camps');
  store.setters.setCamps(data)
}

export function showCampScreen({data, navigator}) {
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {data: _.clone(data)},
    title: data.title
  })
}
