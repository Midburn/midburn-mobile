import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import {EventComponent} from '../components/EventComponent';
import {getHourForTime} from '../../utils/Time';
import Strings from '../../utils/Strings';

export class EventsComponent extends Component {


  renderEmptyState() {
    return (
      <View flex padding-15 style={styles.emptyContainer}>
        <Text center text70 dark40 style={{fontWeight: '500'}}>{Strings("EVENT_EMPTY_STATE")}</Text>
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
        unixTime={gift.item.time}
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
