import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import _ from 'lodash';
import {connect} from 'remx';
import {EventComponent} from './EventComponent';

export class EventsComponent extends Component {
  render() {
    if (_.get(this.props, 'gifts.length') === 0) {
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
      <EventComponent index={i}
                      titleEn={gift.item.titleEn}
                      place={gift.item.locationName}
                      time={gift.item.hour}
                      address={gift.item.locationAddress}
                      descriptionEn={gift.item.descriptionEn}
                      color={gift.item.color}
      />
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
