import _ from 'lodash';
import * as remx from 'remx';
import moment from 'moment';

const MIDBURN_STARTING_UNIX_DATE = 1526299661;

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
    let formDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE);
    let toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(1, 'd');

    state.giftsDay1 = getters.getGiftsInRange(formDay, toDay);
    formDay = toDay;
    toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(2, 'd');
    state.giftsDay2 = getters.getGiftsInRange(formDay, toDay);
    formDay = toDay;
    toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(3, 'd');
    state.giftsDay3 = getters.getGiftsInRange(formDay, toDay);
    formDay = toDay;
    toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(4, 'd');
    state.giftsDay4 = getters.getGiftsInRange(formDay, toDay);
    formDay = toDay;
    toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(5, 'd');
    state.giftsDay5 = getters.getGiftsInRange(formDay, toDay);

    ;
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
      return createMomentDate(gift.time).isBetween(fromDate, toDate);
    });
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsForHoursWindow(hours) {
    let formDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE);
    let toDay = createMomentDate(MIDBURN_STARTING_UNIX_DATE).add(hours, 'h');
    return getters.getGiftsInRange(formDay, toDay);
  },
  getGiftsByDay(date) {
    const filteredGifts = state.giftsByDay[date.format('YYYY-MM-DD')];
    return filteredGifts;//_.sortBy(filteredGifts, ['hour']);
  },
  getGiftsByDayForCamp(campId, date) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return createMomentDate(gift.time).isSame(date, 'day') && gift.campId === campId;
    });
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsInRangeForCamp(campId, fromDate, toDate) {
    const filteredGifts = _.filter(state.gifts, (gift) => {
      return createMomentDate(gift.time).isBetween(fromDate, toDate) && gift.campId === campId;
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
    return [state.giftsDay1, state.giftsDay2, state.giftsDay3, state.giftsDay4, state.giftsDay5];
  }
});


function createMomentDate(timestamp) {
  return moment(timestamp, 'X');
}