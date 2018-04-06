import * as store from './store'
import SCREEN_NAMES from "../../screens/screenNames";
var moment = require('moment');
import * as _ from 'lodash';

export function loadGifts() {
  const gifts = require('../../../data/2018/gifts');
  gifts.forEach(gift => {
    gift.color = getRandomColor();
    gift.hour = moment(gift.time, 'x').format("HH:mm");
    gift.dateString = moment(gift.time, 'x').format('YYYY-MM-DD');
  });

  store.setters.setGifts(gifts);
  setGiftsByDay(_.sortBy(gifts, ['hour']));
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

export function presentGiftsByDate(date) {
  store.setters.setPresentedGifts(store.getters.getGiftsByDay(date));
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
