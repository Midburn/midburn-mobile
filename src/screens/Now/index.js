import React, {Component} from 'react';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';

const HOURS_WINDOW = 3;

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
    gifts: giftsStore.getters.getGiftsForHoursWindow(HOURS_WINDOW)
  };
}

export default connect(mapStateToProps)(NowScreen);