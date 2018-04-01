import _ from 'lodash';
import * as remx from 'remx';
var moment = require('moment');

const state = remx.state({
  gifts: []
});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
  }
});

export const getters = remx.getters({
  getAllGifts() {
    return state.gifts;
  },
  getGiftsInRange(fromDate, toDate) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return moment(gift.time, 'x').isBetween(fromDate, toDate);
    });
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsByDay(date) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return moment(gift.time, 'x').isSame(date, 'day');
    });
    return _.sortBy(filteredGifts, ['hour']);
  }
});
