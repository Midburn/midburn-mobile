import _ from 'lodash';

const img_1 = require('./armchair.png');
const img_2 = require('./binoculars.png');
const img_3 = require('./direction_sign.png');
const img_4 = require('./gas-station.png');
const img_5 = require('./giftbox.png');
const img_6 = require('./lamp-2.png');
const img_7 = require('./lamp.png');
const img_8 = require('./mirror.png');
const img_9 = require('./paper-plane.png');
const img_10 = require('./tedy_bear.png');
const img_11 = require('./torch.png');

const IMAGES_ARRAY = [
  img_1,
  img_2,
  img_3,
  img_4,
  img_5,
  img_6,
  img_7,
  img_8,
  img_9,
  img_10,
  img_11];

function getRandomImage() {
  const ans = IMAGES_ARRAY[Math.floor(Math.random() * IMAGES_ARRAY.length)];
  return ans;
}

function getRandomImagesArray() {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  const ans = _.times(randomNumber, getRandomImage);
  return ans;

}

function tagToImg(tag) {
  if(!tag) {
    return;
  }
  const loweCaseTag = tag.toLowerCase();
  switch (loweCaseTag) {
    case 'food':
      return img_1;
    case 'adult':
      return img_2;
    case 'Alcohol':
      return img_3;
    case 'sound':
      return img_4;

    default:
      return;
  }
}

export {
  getRandomImage,
  getRandomImagesArray,
  tagToImg
};
