import * as store from './store'

export function loadCamps() {
  const data = require('../../../data/camps');
  store.setters.setCamps(data.ToPublish)
}

export function applySearch(text) {
  
}