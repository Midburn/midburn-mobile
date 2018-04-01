import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import * as _ from 'lodash';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventComponent} from './EventComponent';

export class EventsComponent extends Component {
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
