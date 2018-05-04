import _ from 'lodash';
import * as remx from 'remx';
import * as ArtImages from '../../../data/2018/images/arts';
import * as CampsImages from '../../../data/2018/images/camps';
import {isRTL} from '../../utils/Strings';
const Fuse = require('fuse.js');



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
    return getters.getDataToShow(state.art, state.searchArt, ["name", "nameEn", "title", "titleEn", "artist" ]);
  },
  getCampsDataToShow() {
    return getters.getDataToShow(state.camps, state.searchCamp, ["campName", "campNameEn", "description", "descriptionEn", "location", "locationEn" ]);
  },
  getDataToShow(dataArray, whatToSearch, keysToSearch) {
    if (whatToSearch) {
        const options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: keysToSearch
        };
        const fuse = new Fuse(dataArray, options);
        return fuse.search(whatToSearch);
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
    return getters.getTagTitle(state.campTags, tagId);

  },
  getGiftTagTitleForId(tagId) {
    return getters.getTagTitle(state.giftsTags, tagId);
  },
  getTagTitle(array, tagId) {
    const tag = getters.getObjectFromArrayForId(array, 'id', tagId);
    if (!tag) {

      return;
    }
    return isRTL() ? tag.title : tag.titleEn;
  }
});
//
const tempArr = [];