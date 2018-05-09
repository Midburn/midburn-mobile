import React from 'react';
import {Dimensions, Platform } from 'react-native';
import {View} from 'react-native-ui-lib'
import Pdf from 'react-native-pdf';

const IS_IOS = Platform.OS === 'ios';
const MAP = require('../../../data/2018/map/CityMap2018.pdf');


export default class MapScreen extends React.Component {
  render() {
    return (
      <View flex center>
        <Pdf
          source={MAP}
          style={{flex: 1, width: Dimensions.get('window').width}}
        />

      </View>
    )
  }
}
