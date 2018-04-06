import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ListView} from 'react-native';
import {Text, View, Button, ListItem, Colors, Image} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';

import SCREENS from './../../screens/screenNames';
const IMPORTANT_PHONES = 'Important Phone';
const MIDBURN_PRINCIPLES = 'Midburn Principles';
const MAP =  'Map';
const SETTINGS = 'Settings';

const RIGHT_CHEVRON = require('../../../data/img/right-chevron.png');


const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const ITEMS = ds.cloneWithRows([
  {
    image: '',
    text: IMPORTANT_PHONES
  },
  {
    image: '',
    text: MIDBURN_PRINCIPLES,
  },
  {
    image: '',
    text: MAP,
  },
  {
    image: '',
    text: SETTINGS,
  }
]);


export default class ExtraScreen extends Component {

  onPrinciplesPressed = (i) => {
    console.log('RANG', 'onPrinciplesPressed', i);
    this.props.navigator.push({
      screen: SCREENS.PRINCIPLES
    })
  }

  _renderImportantContacts(item, i) {
    return (
      <ListItem
        key={i}
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        onPress={this.onPrinciplesPressed}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
      >
        <ListItem.Part left>
          <View paddingL-16>
            <Image style={{width: 40, height: 40}} source={getRandomImage()}/>
          </View>
        </ListItem.Part>


        <ListItem.Part middle>
          <View paddingL-16>
            <Text>{item.text}</Text>
          </View>
        </ListItem.Part>

        <ListItem.Part right>
          <View paddingR-16>
            <Image style={{width: 20, height: 20}} source={RIGHT_CHEVRON}/>
          </View>
        </ListItem.Part>

        <View bg-black style={{height: 1}}/>
      </ListItem>
    )
  }

  render() {
    return (
      <View flex>
        <ListView
          dataSource={ITEMS}
          renderRow={(row, sectionId, rowId) => this._renderImportantContacts(row, rowId)}
          renderSeparator={() => <View bg-dark60 height={StyleSheet.hairlineWidth}/>}/>
      </View>
    );
  }
}

