import _ from 'lodash';

let ossArray;

export function getOpenSources() {
  if (ossArray) {
    return ossArray;
  }
  const oss = Object.keys(require('./../../package.json').dependencies);
  const ans = _.map(oss, (os) => {
    return {name: os};
  });

  ossArray = ans;
  return ans;
}