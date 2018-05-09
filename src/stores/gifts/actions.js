import * as _ from 'lodash';
import * as store from './store'
import {getMomentObject} from '../../utils/Time';

const moment = require('moment');

export function loadGifts() {
  const gifts = require('../../../data/2018/gifts');
  gifts.forEach(gift => {
    // gift.color = getRandomColor();
    gift.hour = moment(gift.time, 'x').format("HH:mm");
    gift.dateString = getMomentObject(gift.time).format('YYYY-MM-DD');
  });

  const sortedGifts = _.sortBy(gifts, 'time');

  store.setters.setGifts(sortedGifts);
  setGiftsByDay(_.sortBy(sortedGifts, ['hour']));
}

export function loadGiftsTags() {
  const data = require('../../../data/2018/tags/giftsTags');
  store.setters.setGiftsTags(data);
}

export function loadOurLove() {
  const love = require('../../../data/2018/app');
  store.setters.setLove(love);
}

function setGiftsByDay(gifts) {
  const giftByDate = {};
  gifts.forEach(gift => {
    if (giftByDate[gift.dateString]) {
      giftByDate[gift.dateString].push(gift);
    } else {
      giftByDate[gift.dateString] = [gift];
    }
  });

  store.setters.setGiftsByDay(giftByDate);
}

export function dismissFilterScreen(navigator) {
  navigator.dismissModal();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
