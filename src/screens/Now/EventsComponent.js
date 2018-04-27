import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import {EventComponent} from '../components/EventComponent';
import {getHourForTime} from '../../utils/Time';

export class EventsComponent extends Component {


  renderEmptyState() {
    return (
      <View flex style={styles.emptyContainer}>
        <Text text70 dark20>No available events 🤔</Text>
      </View>
    );
  }

  _renderRow(gift, i) {

    return (
      <EventComponent
        index={i}
        titleEn={gift.item.titleEn}
        titleHeb={gift.item.title}
        campHeb={gift.item.campName}
        campEn={gift.item.campNameEn}
        time={getHourForTime(gift.item.time)}
        addressEn={gift.item.locationEn}
        addressHeb={gift.item.location}
        descriptionEn={gift.item.descriptionEn}
        descriptionHeb={gift.item.description}
        color={gift.item.color}
        tags={gift.item.tags}
      />
    );
  }

  _keyExtractor = (item, index) => {
    return index;
  }

  render() {
    if (_.get(this.props, 'gifts.length') === 0) {
      return this.renderEmptyState();
    }
    return (
      <FlatList
        data={this.props.gifts}
        style={styles.list}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
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
