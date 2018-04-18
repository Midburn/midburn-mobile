import * as store from './store'
import * as giftsStore from './../gifts/store'
import SCREEN_NAMES from "../../screens/screenNames";
import _ from 'lodash';
import {Linking} from 'react-native';
import * as DeviceInfo from 'react-native-device-info';
import {isRTL} from '../../utils/Strings';


export function loadCamps() {
  const data = require('../../../data/2018/camps');
  const localizedData = _.map(data, (camp) => {
    if (isRTL()) {
      camp.title = camp.campName;
      camp.description = camp.description;
    } else {
      camp.title = camp.campNameEn;
      camp.description = camp.descriptionEn;
    }

    return camp;
  });

  store.setters.setCamps(localizedData);
}

export function loadArt() {
  const data = require('../../../data/2018/arts');
  const localizedData = _.map(data, (art) => {
    if (isRTL()) {
      art.title = art.title;
      art.name = art.name;
    } else {
      art.title = art.titleEn;
      art.name = art.nameEn;
    }

    return art;
  });
  store.setters.setArt(localizedData);
}

export function showCampScreen({camp, navigator}) {
  const coverImage = store.getters.getCampImage(camp.campId);
  navigator.push({
    screen: SCREEN_NAMES.CAMP_SCREEN,
    passProps: {
      camp,
      coverImage
    },
    navigatorStyle: {
      tabBarHidden: true
    },
    title: camp.title
  });
}

export function showArtScreen({art, navigator, images}) {
  navigator.push({
    screen: SCREEN_NAMES.ART_SCREEN,
    passProps: {
      art,
      images
    },
    navigatorStyle: {
      tabBarHidden: true
    },
    title: art.name
  });
}

export function showFavouritesScreen(navigator, screen, renderRow, onRowPressed) {
  navigator.showModal({
    screen: SCREEN_NAMES.FAVOURITES,
    passProps: {
      data: store.getters.getCampsDataToShow(),
      renderRow,
      onRowPressed
    }
  })
}

export function setCampsGifts() {
  const camps = store.getters.getCamps();
  const gifts = giftsStore.getters.getAllGifts();

  _.forEach(camps, (camp) => {
    const campGifts = [];
    const giftsIdsArray = _.get(camp, 'gifts');
    _.forEach(gifts, (gift) => {
      if (_.includes(giftsIdsArray, gift.giftId)) {
        campGifts.push(gift);
      }
    });
    store.setters.setGiftForCamp(camp.campId, campGifts);
  });
}

export function openEmailFeedback(params = {campId, artId}) {

  const url = buildUrlForFeedback(params);
  try {
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url)
    }
  } catch (err) {
    console.log('ERROR!', 'openEmailFeedback', err);
  }
}

function buildUrlForFeedback({campId, artId}) {
  let ans = 'mailto:midburn.mobile.feedback@gmail.com';
  let subject,nameKey, nameValue, body = '';


  if (campId) {
    const camp = store.getters.getCampForId(campId);
    nameKey = 'camp';
    nameValue = _.get(camp, 'campName');
    subject = `Feedback for Camp: ${nameValue}`;
  } else if (artId) {
    const art = store.getters.getArtForId(artId);
    nameKey = 'art';
    nameValue = _.get(addEventListener(art), 'name');
    subject = `Feedback for Art: ${nameValue}`;
  } else {
    throw new Error('No campId nor artId provided 😱');
  }

  subject = encodeURIComponent(subject);
  ans += `?subject=${subject}`;
  body += `\n\n\n`;
  body += `${nameKey}=${nameValue}\n`;
  body += `locale=${DeviceInfo.getDeviceLocale()}\n`;
  body += `app-version=${DeviceInfo.getVersion()}\n`;
  body += `os-name=${DeviceInfo.getSystemName()}\n`;
  body += `os-version=${DeviceInfo.getSystemVersion()}\n`;
  body = encodeURIComponent(body);
  ans += `&body=${body}`;

  return ans;
}

