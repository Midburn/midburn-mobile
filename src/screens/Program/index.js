import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import {Text, View, Button, TabBar, Carousel} from 'react-native-ui-lib';
import * as _ from 'lodash';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import * as giftsActions from '../../stores/gifts/actions';
import SCREENS from './../../screens/screenNames';
import {EventsComponent} from '../Now/EventsComponent';
import moment from 'moment';

// const MIDBURN_STARTING_DATE = 1526299661000;
// const MIDBURN_STARTING_DATE = 1522092866000; //fake date for presentation, set to 26.3
const MIDBURN_STARTING_DATE = 1522915200; //fake date for presentation, set to 5.4
const {width} = Dimensions.get('window');


const getNumericalStartingDate = () => {
  return new Date(MIDBURN_STARTING_DATE).getDate();
};

const DAYS = ["MON", "TUE", "WED", "THU", 'FRI', 'SAT'];

class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: getNumericalStartingDate(),
      selectedIndex: 0
    };
    this.carousel = undefined;

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'filter_tags',
        icon: require('../../../data/img/filter.png')
      }
    ]
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'filter_tags') {
        this.props.navigator.showModal({
          screen: SCREENS.FILTER_TAGS
        });
      }
    }
  }

  isSelectedDateIsCurrentDate(){
    return this.state.selectedDate === new Date().getDate();
  }


  getFirstHourToShow() {
    if (this.isSelectedDateIsCurrentDate()) {
      return new Date().getHours();
    } else {
      return 0;
    }
  }

  onEventPressed = (event) => {
    this.props.navigator.showModal({
      screen: SCREENS.EVENT_DETAILS,
      passProps: { event }
    });
  }


  dateItemPressed(date, i) {
    const newDate = moment(MIDBURN_STARTING_DATE, 'x').add(i, 'day');
    this.selectedDate(newDate);
    this.setState(_.merge(this.state, { selectedDate: newDate, selectedIndex: i }));
  }


  onPageChanged = (newPageIndex) => {
    console.log('RANG', 'onPageChanged', newPageIndex);
  }

  _renderEventsComponent(giftsOfDay, i) {
    return (
      <View width={width} key={i}>
        <EventsComponent gifts={giftsOfDay} />
      </View>
    );
  }
  renderGiftsList(){
    return (
      <Carousel
        loop={false}
        onChangePage={this.onPageChanged}
        ref={(carousel) => (this.carousel = carousel)}
      >
        {_.map(this.props.gifts, (giftsOfDay, i) =>
          this._renderEventsComponent(giftsOfDay, i)
        )}

      </Carousel>
    );
  }

  _renderTopNextPrevStrip() {
    return (
      <View row spread marginH-18 marginV-6>
        <Button link label={'prev'}/>
        <Button link label={'next'}/>
      </View>
    );
  }

  render() {
    return (
      <View flex>
        {this._renderTopNextPrevStrip()}
        {this.renderGiftsList()}
      </View>
    );
  }
}


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getChunkedGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

