import React, {Component} from 'react';
import {StyleSheet, ListView} from 'react-native';
import {Text, View, Button, ListItem, Colors, Image, TouchableOpacity} from 'react-native-ui-lib';
import Strings, {getLocale} from './../../utils/Strings';
import SCREENS from './../../screens/screenNames';
import {setAppLanguage} from "../../stores/appActions";

const RIGHT_CHEVRON = require('../../../data/img/right-chevron.png');


const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

const getItems = () => ds.cloneWithRows([
  // {
  //   image: '',
  //   text: Strings('PHONES'),
  // },
  {
    text: Strings('MIDBURN_PRINCIPLES'),
    screen: SCREENS.PRINCIPLES
  },
  {
    text: Strings('SAFETY'),
    screen: SCREENS.SAFETY,
    title: Strings('SAFETY')
  },
  // {
  //   image: '',
  //   text: Strings('MAP'),
  //   screen: SCREENS.MAP
  // },
  {
    text: Strings('SELECT_LANGUAGE'),
    screen: SCREENS.SETTINGS,
    title: Strings('SELECT_LANGUAGE')
  },
  {
    text: Strings('FEEDBACK'),
    screen: SCREENS.APP_FEEDBACK,
    title: Strings('FEEDBACK_SCREEN_TITLE')
  },
  {
    text: Strings('OPEN_SOURCES'),
    screen: SCREENS.OPEN_SOURCES,
    title: Strings('OPEN_SOURCES')
  }
]);


export default class ExtraScreen extends Component {


  constructor(props) {
    super(props);
    this.items = getItems();
    this.locale = getLocale();
  }

  onPressed = (item) => {
    this.props.navigator.push({
      screen: item.screen,
      title: item.title,
      navigatorStyle: {
        tabBarHidden: true
      }

    })
  }

  onLanguagePressed(languageId) {
    setAppLanguage(languageId);
  }

  renderLanguageCell(item, i) {
    return (
      <ListItem
        key={i}
        activeBackgroundColor={Colors.dark60}
        height={77.5}
      >


        <ListItem.Part middle>
          <View paddingL-16>
            <Text text60 black style={{fontWeight: '500'}}>{item.text}</Text>
          </View>
        </ListItem.Part>

        <ListItem.Part right>
          <View row marginR-12 center>
            <Button
              onPress={() => this.onLanguagePressed('he')}
              outline={this.locale !== 'he'}
              outlineColor={Colors.blue50}
              avoidInnerPadding
              avoidMinWidth
              center
              text40
              labelStyle={{paddingHorizontal: 6}}
              label={'🇮🇱'}
              size={'small'}
              backgroundColor={this.locale === 'he' ? Colors.blue50 : 'transparent'}
            />

          </View>

          <View row marginR-12 center>
            <Button
              onPress={() => this.onLanguagePressed('en')}
              outline={this.locale !== 'en'}
              outlineColor={Colors.red50}
              avoidInnerPadding
              avoidMinWidth
              center
              text40
              labelStyle={{paddingHorizontal: 5}}
              label={'🇺🇸'}
              size={'small'}
              backgroundColor={this.locale === 'en' ? Colors.red50 : 'transparent'}
            />
          </View>
        </ListItem.Part>

        <View bg-black style={{height: 1}}/>
      </ListItem>
    );

  }

  _renderImportantContacts(item, i) {
    if (item.screen === SCREENS.SETTINGS) {
      return this.renderLanguageCell(item, i);
    }
    return (
      <ListItem
        key={i}
        activeBackgroundColor={Colors.dark60}
        height={77.5}
        onPress={() => this.onPressed(item)}
      >


        <ListItem.Part middle>
          <View paddingL-16>
            <Text text60 black style={{fontWeight: '500'}}>{item.text}</Text>
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
          dataSource={this.items}
          renderRow={(row, sectionId, rowId) => this._renderImportantContacts(row, rowId)}
          renderSeparator={() => <View bg-dark60 height={StyleSheet.hairlineWidth}/>}/>
      </View>
    );
  }
}

