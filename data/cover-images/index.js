import _ from 'lodash';

const cover_1 = require('./cover1.jpg');
const cover_2 = require('./cover2.jpg');
const cover_3 = require('./cover3.jpg');
const cover_4 = require('./cover4.jpg');
const cover_5 = require('./cover5.jpg');
const cover_6 = require('./cover6.jpg');
const cover_7 = require('./cover7.jpg');
const cover_8 = require('./cover8.jpg');
const cover_9 = require('./cover9.jpg');
const cover_10= require('./cover10.jpg');
const cover_11 = require('./cover11.jpg');
const cover_12 = require('./cover12.jpg');
const cover_13 = require('./cover13.jpg');
const cover_14 = require('./cover14.jpg');
const cover_15 = require('./cover15.jpg');
const cover_16 = require('./cover16.jpg');
const cover_17 = require('./cover17.jpg');
const cover_18 = require('./cover18.jpg');
const cover_19 = require('./cover19.jpg');
const cover_20 = require('./cover20.jpg');
const cover_21 = require('./cover21.jpg');
const cover_22 = require('./cover22.jpg');
const cover_23 = require('./cover23.jpg');
const cover_24 = require('./cover24.jpg');
const cover_25 = require('./cover25.jpg');
const cover_26 = require('./cover26.jpg');
const cover_27 = require('./cover27.jpg');
const cover_28 = require('./cover28.jpg');
const cover_29 = require('./cover29.jpg');
const cover_30 = require('./cover30.jpg');


const IMAGES_ARRAY = [
  cover_1,
  cover_2,
  cover_3,
  cover_4,
  cover_5,
  cover_6,
  cover_7,
  cover_8,
  cover_9,
  cover_10,
  cover_11,
  cover_12,
  cover_13,
  cover_14,
  cover_15,
  cover_16,
  cover_17,
  cover_18,
  cover_19,
  cover_20,
  cover_20,
  cover_21,
  cover_22,
  cover_23,
  cover_24,
  cover_25,
  cover_26,
  cover_27,
  cover_28,
  cover_29,
  cover_30,

];

function getRandomCoverImage() {
  const ans = IMAGES_ARRAY[Math.floor(Math.random() * IMAGES_ARRAY.length)];
  return ans;
}

function getRandomCoverImagesArray() {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  const ans = _.times(randomNumber, getRandomImage);
  return ans;

}

export {
  getRandomCoverImage,
  getRandomCoverImagesArray
};
