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
        if (camp['title']) {
          return camp['title'].toLowerCase().includes(state.search.toLowerCase());
        } return false;
      });
      return ans;
    }
    return state.camps;
  },
  getCampForId(campId) {
    return _.find(state.camps, (camp) => camp.campId === campId);

  },
  getCampTitle(campId) {
    const camp = getters.getCampForId(campId);
    _.get(camp, 'title');
  }
});
