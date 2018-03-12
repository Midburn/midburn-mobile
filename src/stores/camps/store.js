import * as remx from 'remx';

const state = remx.state({
  camps: [],
  search: undefined
});

export const setters = remx.setters({
  setCamps(camps) {
    state.camps = camps;
  }
});

export const getters = remx.getters({
  getCamps() {
    return state.camps;
  }
});
