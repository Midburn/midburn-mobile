import React, { Component } from 'react';
import {View, Text, Button, Colors, Image} from 'react-native-ui-lib';
import Strings from './../../utils/Strings';
import {setAppLanguage} from '../../stores/appActions';

const gif = require('../../../data/2018/images/love.gif');

const HEBREW = {label: ' 🇮🇱 עברית ', id: 'he'};
const ENGLISH = {label: 'ENGLISH  🇺🇸', id: 'en'};

export default class SettingsScreen extends Component {

  _onButtonPress(languageId) {
    setAppLanguage(languageId);
  }

  render() {
    return (
      <View flex spread margin-16>
        <View centerH paddingT-40>
          <Text text40 center>
            {Strings('SELECT_LANGUAGE')}
          </Text>
        </View>
        <View center flex>
          <Button
            marginB-30
            label={HEBREW.label}
            backgroundColor={Colors.purple30}
            onPress={() => this._onButtonPress(HEBREW.id)}
          />
          <Button
            marginB-30
            label={ENGLISH.label}
            backgroundColor={Colors.purple30}
            onPress={() => this._onButtonPress(ENGLISH.id)}
          />
        </View>
      </View>
    );
  }
}

