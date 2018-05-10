import React from 'react';
import {Dimensions, BackHandler, Platform} from 'react-native';
import {View} from 'react-native-ui-lib'
import Pdf from 'react-native-pdf';

const MAP = require('../../../data/2018/map/CityMap2018.pdf');
const IS_IOS = Platform.OS === 'ios';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.source = IS_IOS ? MAP : {uri: 'bundle-assets://data/2018/map/CityMap2018.pdf'}

  }

  componentDidMount() {
    setTimeout(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.navigator.pop();
        return true;
      });
    }, 500);
  }

  render() {
    return (
      <View flex center>
        <Pdf
          source={this.source}
          style={{flex: 1, width: Dimensions.get('window').width}}
        />
      </View>
    )
  }
}
