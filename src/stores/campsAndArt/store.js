import _ from 'lodash';
import * as remx from 'remx';
import * as ArtImages from '../../../data/2018/images/arts';
import * as CampsImages from '../../../data/2018/images/camps';
import {isRTL} from '../../utils/Strings';


const state = remx.state({
  camps: [],
  art: [],
  searchCamp: undefined,
  searchArt: undefined,
  selectedTagIndex: undefined,
  campTags: [],
  giftsTags: []
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
  setGiftForCamp(campId, gifts) {
    const camp = getters.getCampForId(campId);
    camp.gifts = gifts;
  },
  setCampTags(tags) {
    state.campTags = tags;
  },
  setGiftsTags(tags) {
    state.giftsTags = tags;
  }
});

export const getters = remx.getters({
  getCamps() {
    return state.camps;
  },
  getSelectedTab() {
    return state.selectedTab;
  },
  getSearchText() {
    return state.search;
  },
  getArtDataToShow() {
    const key = isRTL() ? 'name' : 'nameEn';
    return getters.getDataToShow(state.art, state.searchArt, key);
  },
  getCampsDataToShow() {
    const key = isRTL() ? 'campName' : 'campNameEn';
    return getters.getDataToShow(state.camps, state.searchCamp, key);
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
    return getters.getObjectFromArrayForId(state.camps, 'campId', campId);
    // return _.find(state.camps, (camp) => camp.campId === campId);
  },
  getArtForId(artId) {
    return getters.getObjectFromArrayForId(state.art, 'artId', artId);
  },
  getObjectFromArrayForId(array, key, value) {
    return _.find(array, (obj) => obj[key]=== value);
  },
  getCampTitle(campId) {
    const camp = getters.getCampForId(campId);
    _.get(camp, 'title');
  },
  getSelectedTagIndex() {
    return state.selectedTagIndex
  },
  getArtImage(artId) {
    const ans = ArtImages.getImageForArtId(artId);

    //
    //
    // if (_.indexOf(tempArr, artId) < 0) {
    //   tempArr.push(artId);
    //   // console.log('RANG', 'getArtImage', tempArr);
    // } else {
    //   return ans;
    // }
    //
    // let toPrint = `${artId}: [`;
    // const images = getters.getArtForId(artId).images;
    // _.forEach(images, (image, i) => {
    //   toPrint += `require(\'./${artId}/art${i+1}.jpg\'), `
    // });
    // toPrint += '],';
    // console.log('RANG', toPrint);
    //

    return ans;
  },
  getArtImages(artId) {
    const ans = ArtImages.getImagesForArtId(artId);

    return ans;
  },
  getCampImage(campId) {
    const ans = CampsImages.getImageForCampId(campId);
    return ans;
  },
  getCampGiftForId(campId) {
    const camp = getters.getCampForId(campId);
    return _.get(camp, 'gifts');
  },
  getCampTagTitleForId(tagId) {
    const tag = getters.getObjectFromArrayForId(state.campTags, 'id', tagId);
    return isRTL() ? tag.title : tag.titleEn;

  },
  getGiftTagTitleForId(tagId) {
    const tag = getters.getObjectFromArrayForId(state.giftsTags, 'id', tagId);
    if (tagId === 'Play') {
      debugger;
    }
    if (!tag) {
      return;
    }
    return isRTL() ? tag.title : tag.titleEn;
  }

});
//
const tempArr = [];