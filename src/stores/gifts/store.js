import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  gifts: []
});

export const setters = remx.setters({
  setGifts(gifts) {
    state.gifts = gifts;
  }
});

export const getters = remx.getters({
  getGifts() {
    return state.gifts;
  }
});
