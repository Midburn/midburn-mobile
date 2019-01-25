import React, {Component} from 'react';
import {BackHandler, Platform} from 'react-native';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';
import SCREEN_NAMES from '../screenNames';
import Strings from "../../utils/Strings";
import {exitApp} from "../../stores/appActions";


const SURPRISE_ME = 'NAV_BAR_BUTTON_SURPRISE_ME';
const MAP = 'NAV_BAR_BUTTON_MAP';
const SURPRISE_ME_ICON = require('../../../data/img/present.png');
const MAP_ICON = require('../../../data/img/mapNavBar.png');
const IS_IOS = Platform.OS === 'ios';

class NowScreen extends Component {

  static navigatorButtons = IS_IOS ? {
    rightButtons: [
      {
        id: SURPRISE_ME,
        icon: SURPRISE_ME_ICON,
      },
    ],
    leftButtons: [
      {
        id: MAP,
        icon: MAP_ICON,
      },
    ]
  } : {
    rightButtons: [
      {
        id: SURPRISE_ME,
        icon: SURPRISE_ME_ICON,
      },
      {
        id: MAP,
        icon: MAP_ICON,
      }
    ],
  };

  constructor(props) {
    super(props);
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === SURPRISE_ME) {
      this.props.navigator.showModal( {
        screen: SCREEN_NAMES.SURPRISE_ME,
      });
    }

    if (event.id === MAP) {
      this.props.navigator.push( {
        screen: SCREEN_NAMES.MAP,
        navigatorStyle: {
          tabBarHidden: true
        }
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