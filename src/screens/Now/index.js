import React, {Component} from 'react';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';
import SCREEN_NAMES from '../screenNames';
import Strings from "../../utils/Strings";


const SURPRISE_ME = 'NAV_BAR_BUTTON_SURPRISE_ME';

class NowScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        id: SURPRISE_ME,
        title: 'Now',
        icon: require('../../../data/img/present.png'),
      },
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));


  }

  onNavigatorEvent(event) {
    if (event.id === SURPRISE_ME) {
      this.props.navigator.showModal( {
        screen: SCREEN_NAMES.SURPRISE_ME,
      })
    }
  }

  render() {
    return (
      <EventsComponent
        gifts={this.props.gifts}
        emptyStateString={Strings('NOW_EMPTY_STATE')}
      />
    );
  }
}

function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGiftsForHoursWindow()
  };
}

export default connect(mapStateToProps)(NowScreen);