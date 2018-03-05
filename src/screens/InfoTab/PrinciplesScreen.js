import _ from 'lodash';
import React, {Component} from 'react';
import {Image, StyleSheet, ScrollView} from 'react-native';
import {Button, Text, View} from 'react-native-ui-lib';

const principlesData = require('./principlesData/principles.json').principles;


export default class PrinciplesScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>


        {
          _.map(principlesData, (principle) => {
            return (
              <View padding-8 key={principle.name}>
                <Text text30>{principle.name}</Text>
                <Text text70>{principle.description}</Text>
              <Image
                source={require('./principlesData/civicresponsability.png')}
              />
              </View>
            );
          })
        }


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
