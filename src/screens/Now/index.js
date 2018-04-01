import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import * as _ from 'lodash';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventComponent} from './EventComponent';
var moment = require('moment');

class NowScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'surprise_me',
        title: 'Now',
        icon: require('../../../data/img/present_new.png'),

      },
    ]
  };


  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.gifts.length === 0) {
      return this.renderEmptyState();
    }
    return (
      <FlatList
          data={this.props.gifts}
          style={styles.list}
          renderItem={this._renderRow}
          keyExtractor={(item, index) => index}
          style={styles.list}
        />
    );
  }

  renderEmptyState() {
    return (
      <View flex style={styles.emptyContainer}>
        <Text text70 dark20>No available events 🤔</Text>
      </View>
    );
  }

  _renderRow(gift, i) {
    return (
      <EventComponent index={i} title={gift.item.title} place={gift.item.locationName} time={gift.item.hour}
                      address={gift.item.locationAddress} description={gift.item.description}
                      color={gift.item.color} />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 15
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGiftsInRange(moment().subtract(3, 'days'), moment().add(3, 'days'))
    // gifts: giftsStore.getters.getGiftsInRange(moment(), moment().add(3, 'hours'))
  };
}

export default connect(mapStateToProps)(NowScreen);