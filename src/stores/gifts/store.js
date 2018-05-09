import _ from 'lodash';
import * as remx from 'remx';
import {getMomentObject, getNowUnixTime} from '../../utils/Time';
import {isRTL} from "../../utils/Strings";

const MIDBURN_STARTING_UNIX_DATE = 1526274000;
const DEFAULT_NOW_HOURS_WINDOW = 3;


const state = remx.state({
  gifts: [],
  giftsAllDays: [],

  ourLove: [],
  currentTime: MIDBURN_STARTING_UNIX_DATE,
  giftsTags: []
});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
    setters.setGiftForDays();
  },
  setLove(love) {
    state.ourLove = love;
  },
  setGiftForDays() {
    let fromDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE);
    let toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(1, 'd');

    const day1 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(2, 'd');
    const day2 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(3, 'd');
    const day3 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(4, 'd');
    const day4 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(5, 'd');
    const day5 = getters.getGiftsInRange(fromDay, toDay);
    state.giftsAllDays = [day1, day2, day3, day4, day5];
  },
  setCurrentTime() {
    const now = getNowUnixTime();
    if (now < MIDBURN_STARTING_UNIX_DATE) {
      return;
    }
    state.currentTime = now;
  },
  setGiftsTags(tags) {
    state.giftsTags = tags;
  }
});

export const getters = remx.getters({
  getAllGifts() {
    return state.gifts;
  },
  getOurLove() {
    return state.ourLove;
  },
  getGiftsInRange(fromDate, toDate, minimum = -1) {
    let filteredGifts = _.filter(state.gifts, (gift) => {
      return getMomentObject(gift.time).isBetween(fromDate, toDate);
    });

    if (minimum > 0 && minimum > filteredGifts.length) {
      filteredGifts = _.filter(state.gifts, (gift) => {
        return getMomentObject(gift.time).isBetween(fromDate, toDate.add(3, 'days'));
      });
      filteredGifts = _.take(filteredGifts, minimum);
    }
    return _.sortBy(filteredGifts, ['hour']);
  },
  getGiftsForHoursWindow(hours = DEFAULT_NOW_HOURS_WINDOW) {
    let formDay = getMomentObject(getters.getCurrentTime());
    let toDay = getMomentObject(getters.getCurrentTime()).add(hours, 'h');
    return getters.getGiftsInRange(formDay, toDay, 20);
  },
  getCurrentTime() {
    return state.currentTime;
  },
  getChunkedGifts() {
    return state.giftsAllDays;
  },
  getLoveToSpread() {
    const ourLoveArray = getters.getOurLove();
    return ourLoveArray[Math.floor(Math.random() * ourLoveArray.length)];

  },
  getObjectFromArrayForId(array, key, value) {
    return _.find(array, (obj) => obj[key]=== value);
  },
  getGiftTagTitleForId(tagId) {
    const tag = getters.getObjectFromArrayForId(state.giftsTags, 'id', tagId);
    if (!tag) {

      return;
    }
    return isRTL() ? tag.title : tag.titleEn;
  },
  getGiftsTags() {
    return state.giftsTags;
  }
});

