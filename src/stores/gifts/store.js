import _ from 'lodash';
import * as remx from 'remx';
import {getMomentObject, getNowUnixTime} from '../../utils/Time';

const MIDBURN_STARTING_UNIX_DATE = 1526274000;
const DEFAULT_NOW_HOURS_WINDOW = 3;


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
  ourLove: [],
  currentTime: MIDBURN_STARTING_UNIX_DATE

});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
    setters.setGiftForDays();
  },
  setLove(love) {
    state.ourLove = love;
  },
  setPresentedGifts(gifts) {
    state.presentedGifts = gifts;
  },
  setGiftsByDay(giftsByDay) {
    state.giftsByDay = giftsByDay;
  },
  setGiftForDays() {
    let fromDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE);
    let toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(1, 'd');

    state.giftsDay1 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(2, 'd');
    state.giftsDay2 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(3, 'd');
    state.giftsDay3 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(4, 'd');
    state.giftsDay4 = getters.getGiftsInRange(fromDay, toDay);
    fromDay = toDay;
    toDay = getMomentObject(MIDBURN_STARTING_UNIX_DATE).add(5, 'd');
    state.giftsDay5 = getters.getGiftsInRange(fromDay, toDay);
  },
  setCurrentTime() {
    const now = getNowUnixTime();
    if (now < MIDBURN_STARTING_UNIX_DATE) {
      return;
    }

    state.currentTime = now;
  },
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
  getGiftsByDay(date) {
    return state.giftsByDay[date.format('YYYY-MM-DD')];
  },
  getCurrentTime() {
    return state.currentTime;
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
  },
  getLoveToSpread() {
    const ourLoveArray = getters.getOurLove();
    return ourLoveArray[Math.floor(Math.random() * ourLoveArray.length)];

  }
});

