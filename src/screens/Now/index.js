import React, {Component} from 'react';
import {Text, View, Button, Card, Colors} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventsComponent} from './EventsComponent';
import SCREENS from './../../screens/screenNames';


class NowScreen extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  // RANG - V2
  static navigatorButtons = {
    // leftButtons: [
    //   {
    //     id: 'surprise_me',
    //     title: 'Now',
    //     icon: require('../../../data/img/present_new.png'),
    //   },
    // ],
    rightButtons: [
      {
        id: 'map',
        title: 'Now',
        icon: require('../../../data/img/map.png'),
      },
    ]
  };

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'surprise_me') { // this is the same id field from the static navigatorButtons definition
        // AlertIOS.alert('NavBar', 'surprise_me button pressed');
      }
      if (event.id == 'map') {
        // AlertIOS.alert('NavBar', 'map button pressed');
        this.props.navigator.showModal({
          screen: SCREENS.MAP
        });
      }
    }
  }

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
    gifts: giftsStore.getters.getGiftsForHoursWindow()
  };
}

export default connect(mapStateToProps)(NowScreen);