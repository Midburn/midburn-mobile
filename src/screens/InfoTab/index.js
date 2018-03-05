import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';

import SCREENS from './../../screens/screenNames';


export default class InfoTab extends Component {

  onPrinciplesPressed() {
    this.props.navigator.push({
      screen: SCREENS.PRINCIPLES
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          INFO TAB
        </Text>
        <Button label={'Principles'} onPress={() => this.onPrinciplesPressed()}/>
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
