import * as remx from 'remx';

const state = remx.state({
  camps: []
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