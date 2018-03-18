import _ from 'lodash';
import * as remx from 'remx';

const state = remx.state({
  camps: [],
  search: undefined
});

export const setters = remx.setters({
  setCamps(camps) {
    state.camps = camps;
  },
  setSearch(search) {
    console.log('RANG', 'setSearch', search);
    state.search = search;
  }
});

export const getters = remx.getters({
  getSearchText() {
    return state.search;
  },
  getCampsToShow() {
    if (state.search) {
      const ans = _.filter(state.camps, (camp) => {
        if (camp['name_en']) {
          return camp['name_en'].toLowerCase().includes(state.search.toLowerCase());
        } return false;
      });
      return ans;
    }
    return state.camps;
  }
});
