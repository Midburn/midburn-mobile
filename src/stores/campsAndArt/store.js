import _ from 'lodash';
import * as remx from 'remx';
import * as ArtImages from '../../../data/2018/images/arts';


const state = remx.state({
  camps: [],
  art: [],
  searchCamp: undefined,
  searchArt: undefined,
  selectedTagIndex: undefined
});


export const setters = remx.setters({
  setCamps(camps) {
    state.camps = camps;
  },
  setArt(art) {
    state.art = art;
  },
  setSearchCamp(search) {
    state.searchCamp = search;
  },
  setSearchArt(search) {
    state.searchArt = search;
  },
});

export const getters = remx.getters({
  getSelectedTab() {
    return state.selectedTab;
  },
  getSearchText() {
    return state.search;
  },
  getArtDataToShow() {
    return getters.getDataToShow(state.art, state.searchArt, 'name');
  },
  getCampsDataToShow() {
    return getters.getDataToShow(state.camps, state.searchCamp, 'campName');
  },
  getDataToShow(dataArray, whatToSearch, keyToSearch) {
    if (whatToSearch) {
      return _.filter(dataArray, (obj) => {
        const text = _.get(obj, `${keyToSearch}`);
        if (text) {
          return _.toLower(text).includes(_.toLower(whatToSearch));
        } return false;
      });
    }
    return dataArray;
  },
  getCampForId(campId) {
    return _.find(state.camps, (camp) => camp.campId === campId);

  },
  getCampTitle(campId) {
    const camp = getters.getCampForId(campId);
    _.get(camp, 'title');
  },
  getSelectedTagIndex() {
    return state.selectedTagIndex
  },
  getArtImage(data) {

    const id = _.get(data, 'item.artId');
    // if (!_.includes(tempArr, id)) {
    //   console.log(`${id}: require('./${id}/art1.jpg'),`);
    //   tempArr.push(id);
    // }

    const ans = ArtImages.getImageForArtId(id);

    return ans;
  }
});

// const tempArr = [];