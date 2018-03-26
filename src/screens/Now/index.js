import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import * as _ from 'lodash';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventComponent} from './EventComponent';

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

  _renderRow(gift, i) {
    return (
      <EventComponent index={i} title={gift.item.title} place={gift.item.locationName} time={'12:00'}
                      address={gift.item.locationAddress} description={gift.item.description}
                      color={gift.item.color} />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 15
  }
});

function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGifts()
  };
}

export default connect(mapStateToProps)(NowScreen);