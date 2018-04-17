import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ListView} from 'react-native';
import {Text, View, Button, ListItem, Colors, Image} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import Strings from './../../utils/Strings';


import SCREENS from './../../screens/screenNames';
const IMPORTANT_PHONES = 'Important Phone';
const MIDBURN_PRINCIPLES = 'Midburn Principles';
const MAP =  'Map';
const SETTINGS = 'Settings';
const OPEN_SOURCES = 'Open Sources';

const RIGHT_CHEVRON = require('../../../data/img/right-chevron.png');


const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const ITEMS = ds.cloneWithRows([
  {
    image: '',
    text: Strings('PHONES'),

  },
  {
    image: '',
    text: Strings('MIDBURN_PRINCIPLES'),
    screen: SCREENS.PRINCIPLES
  },
  {
    image: '',
    text: Strings('MAP'),
    screen: SCREENS.MAP
  },
  // {
  //   image: '',
  //   text: Strings('SETTINGS'),
  //   screen: SCREENS.PRINCIPLES
  // },
  {
    image: '',
    text: Strings('OPEN_SOURCES'),
    screen: SCREENS.OPEN_SOURCES,
    title: Strings('OPEN_SOURCES')
  }
]);


export default class ExtraScreen extends Component {

  onPressed = (item) => {


    this.props.navigator.push({
      screen: item.screen,
      title: item.title
    })
  }

  _renderImportantContacts(item, i) {
    return (
      <ListItem
        key={i}
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        onPress={() => this.onPressed(item)}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
      >


        <ListItem.Part middle>
          <View paddingL-16>
            <Text text60>{item.text}</Text>
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

