import React, { Component } from 'react';
import {View, Text, Button, Colors, Image} from 'react-native-ui-lib';
import Strings from './../../utils/Strings';
import {openEmailFeedback} from '../../stores/campsAndArt/actions';
import {BackHandler} from "react-native";

const gif = require('../../../data/2018/images/love.gif');

export default class AppFeedbackScreen extends Component {

  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  _onButtonPress = () => {
    openEmailFeedback({});
  }

  render() {
    return (
      <View flex spread margin-16>
        <View flex centerH paddingT-40>
          <Text text40 center style={{fontWeight: '500'}}>
            {Strings('WHAT_DO_YOU_THINK')}
          </Text>
          <View marginT-50>
            <Image
              style={{width: 250, height: 250}}
              source={gif}
            />
          </View>
        </View>
        <View center>
          <Button
            marginB-30
            label={Strings('SURE')}
            backgroundColor={Colors.purple30}
            onPress={this._onButtonPress}
          />
        </View>
      </View>
    );
  }
}

