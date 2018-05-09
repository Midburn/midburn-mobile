import * as _ from 'lodash';
import * as store from './store'
import {getMomentObject} from '../../utils/Time';

const moment = require('moment');

export function loadGifts() {
  const gifts = require('../../../data/2018/gifts');
  gifts.forEach(gift => {
    gift.hour = moment(gift.time, 'x').format("HH:mm");
    gift.dateString = getMomentObject(gift.time).format('YYYY-MM-DD');
  });

  const sortedGifts = _.sortBy(gifts, 'time');

  store.setters.setGifts(sortedGifts);
}

export function loadGiftsTags() {
  const data = require('../../../data/2018/tags/giftsTags');
  const dataWithFiltered = _.map(data, (tag) => _.merge(tag, {filtered: false}));
  store.setters.setGiftsTags(dataWithFiltered);
}

export function loadOurLove() {
  const love = require('../../../data/2018/app');
  store.setters.setLove(love);
}


export function dismissFilterScreen(navigator, avoidDismissModal = false) {
  store.setters.setLoading(true);
  store.setters.setGiftForDays(true);
  if (!avoidDismissModal) {
    navigator.dismissModal();
  }
  store.setters.setLoading(false);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
