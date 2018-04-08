import _ from 'lodash';
import * as remx from 'remx';
import moment from 'moment';

const MIDBURN_STARTING_DATE = 1526299661;

const state = remx.state({
  gifts: [],
  giftsByDay: {
    "2010-20-20": [

    ]
  },
  presentedGifts: [],
  giftsDay1: [],
  giftsDay2: [],
  giftsDay3: [],
  giftsDay4: [],
  giftsDay5: [],

});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
    setters.setGiftForDays();
  },
  setPresentedGifts(gifts) {
    state.presentedGifts = gifts;
  },
  setGiftsByDay(giftsByDay) {
    state.giftsByDay = giftsByDay;
  },
  setGiftForDays() {
    const chunksArray = _.chunk(state.gifts, 5);

    state.giftsDay1 = chunksArray[0];
    state.giftsDay2 = chunksArray[1];
    state.giftsDay3 = chunksArray[2];
    state.giftsDay4 = chunksArray[3];
    state.giftsDay5 = chunksArray[4];
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
  },

  getGiftsForCampId(campId) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return gift.campId === campId;
    });
    return filteredGifts;
  },

  getAllTags() {

    const tagsArray = _.map(state.gifts, (gift) => {
      return _.get(gift, 'tags');
    });

    const tagsWithDuplicates =  _.flattenDeep(tagsArray);
    return _.uniq(tagsWithDuplicates);

  },
  getChunkedGifts() {
    const gifts = getters.getAllGifts();
    const ans =  _.chunk(gifts, gifts.length / 5);
    console.log('RANG', 'getChunkedGifts', ans);
    return ans;
  }
});
