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
  giftsTags: [],
  loading: false
});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
    setters.setGiftForDays();
  },
  setLove(love) {
    state.ourLove = love;
  },
  setGiftForDays(shouldFilter) {
    setters.setLoading(true);
    let fromDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE);
    let toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(1, 'd');

    const day1 = getters.getGiftsInRange(fromDay, toDay, -1, shouldFilter);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(2, 'd');
    const day2 = getters.getGiftsInRange(fromDay, toDay, -1, shouldFilter);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(3, 'd');
    const day3 = getters.getGiftsInRange(fromDay, toDay, -1, shouldFilter);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(4, 'd');
    const day4 = getters.getGiftsInRange(fromDay, toDay, -1, shouldFilter);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(5, 'd');
    const day5 = getters.getGiftsInRange(fromDay, toDay, -1, shouldFilter);
    state.giftsAllDays = [day1, day2, day3, day4, day5];
    setters.setLoading(false);
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
  },
  toggleTagFilter(tagId) {
    const tag = getters.getObjectFromArrayForId(state.giftsTags, 'id', tagId);
    tag.filtered = !tag.filtered;
    state.giftsTags = _.slice(state.giftsTags);
  },
  cleanFilters() {
    const tagsWithoutFilters = _.map(getters.getGiftsTags(), (tag) => _.merge(tag, {filtered: false}));
    setters.setGiftsTags(tagsWithoutFilters);
  },
  setLoading(isLoading) {
    state.loading = isLoading;
  }
});

export const getters = remx.getters({
  getAllGifts() {
    return state.gifts;
  },
  getOurLove() {
    return state.ourLove;
  },
  getGiftsInRange(fromDate, toDate, minimum = -1, filter = false) {
    let filteredGifts = _.filter(state.gifts, (gift) => {
      return getMomentObject(gift.time).isBetween(fromDate, toDate);
    });

    if (minimum > 0 && minimum > filteredGifts.length) {
      filteredGifts = _.filter(state.gifts, (gift) => {
        return getMomentObject(gift.time).isBetween(fromDate, toDate.add(3, 'days'));
      });
      filteredGifts = _.take(filteredGifts, minimum);
    }
    if (filter) {
      const tags = _.filter(getters.getGiftsTags(), 'filtered');
      const tagsIdsToShow = _.map(tags, 'id');

      filteredGifts = _.filter(filteredGifts, (gifts) => {
        const intersectionTags = _.intersection(tagsIdsToShow, gifts.tags);
        return intersectionTags.length === tagsIdsToShow.length;
      });
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
  },
  getFilterForTagId(tagId) {
    const tag = getters.getObjectFromArrayForId(getters.getGiftsTags(), 'id', tagId);
    return _.get(tag, 'filtered');
  },
  getFilteredTags() {
    return _.filter(getters.getGiftsTags(), 'filtered');
  },
  getLoading() {
    return state.loading;
  }
});


