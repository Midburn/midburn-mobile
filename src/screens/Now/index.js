import React, {Component} from 'react';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';

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

  render() {
    return (
      <EventsComponent
          gifts={this.props.gifts}
      />
    );
  }
}

function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGiftsInRange(moment().subtract(3, 'days'), moment().add(3, 'days'))
  };
}

export default connect(mapStateToProps)(NowScreen);