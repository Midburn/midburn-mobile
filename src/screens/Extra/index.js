import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';

import SCREENS from './../../screens/screenNames';


export default class ExtraScreen extends Component {

  onPrinciplesPressed() {
    this.props.navigator.push({
      screen: SCREENS.PRINCIPLES
    })
  }

  render() {
    return (
      <View flex center>
        <Button margin-8 label={'Important Phone'} onPress={() => this.onPrinciplesPressed()}/>
        <Button margin-8 label={'Principles'} onPress={() => this.onPrinciplesPressed()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
