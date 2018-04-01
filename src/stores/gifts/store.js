import _ from 'lodash';
import * as remx from 'remx';
var moment = require('moment');

const state = remx.state({
  gifts: [],
  giftsByDay: {
    "2010-20-20": [

    ]
  },
  presentedGifts: []
});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
  },
  setPresentedGifts(gifts) {
    state.presentedGifts = gifts;
  },
  setGiftsByDay(giftsByDay) {
    state.giftsByDay = giftsByDay;
  }
});

export const getters = remx.getters({
  getAllGifts() {
    return state.gifts;
  },
  getPresentedGifts() {
    return state.presentedGifts;
  },
  getGiftsInRange(fromDate, toDate) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return moment(gift.time, 'x').isBetween(fromDate, toDate);
    });
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsByDay(date) {
    const filteredGifts = state.giftsByDay[date.format('YYYY-MM-DD')];
    return filteredGifts;//_.sortBy(filteredGifts, ['hour']);
  },
  getGiftsByDayForCamp(campId, date) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return moment(gift.time, 'x').isSame(date, 'day') && gift.campId === campId;
    });
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsInRangeForCamp(campId, fromDate, toDate) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return moment(gift.time, 'x').isBetween(fromDate, toDate) && gift.campId === campId;
    });
    return _.sortBy(filteredGifts, ['hour']);
  }
});
