import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Button, TabBar } from 'react-native-ui-lib';
import * as _ from 'lodash';
import { connect } from 'remx';
import * as campsStore from '../../stores/campsAndArt/store';
// import * as giftsActions from '../../stores/gifts/actions';
import SCREENS from './../../screens/screenNames';

class FilterTagsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


function mapStateToProps(props) {
  return {
    tags: campsStore.getters.getAllTags()
  };
}

export default connect(mapStateToProps)(FilterTagsScreen);

