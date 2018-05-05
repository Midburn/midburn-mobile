import React, {Component} from 'react';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';
import SCREEN_NAMES from '../screenNames';
import Strings from "../../utils/Strings";
import {exitApp} from "../../stores/appActions";
import {BackHandler} from "react-native";


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
      });
    }

    switch(event.id) {
      case 'willAppear':
        BackHandler.removeEventListener();
        BackHandler.addEventListener('hardwareBackPress', () => {
          exitApp();
          return true;
        });
        break;
      case 'willDisappear':
        BackHandler.removeEventListener();
        BackHandler.addEventListener('hardwareBackPress', () => {
          this.props.navigator.switchToTab({
            tabIndex: 0 // (optional) if missing, this screen's tab will become selected
          });
          return true;
        });
        break;
    }



    // else if (event.id === 'backPress') {
    //   console.warn('RANG', 'onNavigatorEvent', 'NNNOOOWWW');
    //  exitApp();
    // }
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