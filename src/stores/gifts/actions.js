import * as store from './store'
import SCREEN_NAMES from "../../screens/screenNames";

export function loadGifts() {
  const gifts = require('../../../data/2018/gifts');
  gifts.forEach(gift => {
    gift.color = getRandomColor()
  });
  
  store.setters.setGifts(gifts);
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// function giftsByDate(gifts) {
//   gifts.forEach(gift => {
    
//   });
// }
