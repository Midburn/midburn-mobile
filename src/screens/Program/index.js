import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Text, View, Button, TabBar } from 'react-native-ui-lib';
import * as _ from 'lodash';
import { connect } from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import * as giftsActions from '../../stores/gifts/actions';
import SCREENS from './../../screens/screenNames';
import {EventsComponent} from '../Now/EventsComponent';
import moment from 'moment';

// const MIDBURN_STARTING_DATE = 1526299661000;
// const MIDBURN_STARTING_DATE = 1522092866000; //fake date for presentation, set to 26.3
const MIDBURN_STARTING_DATE = 1522915200; //fake date for presentation, set to 5.4

const getNumericalStartingDate = () => {
  return new Date(MIDBURN_STARTING_DATE).getDate();
}

class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      selectedDate: getNumericalStartingDate(),
      selectedIndex: 0
    };

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

  componentDidMount() {
    this.dateItemPressed(0);
  }

  isSelectedDateIsCurrentDate(){
    return this.state.selectedDate === new Date().getDate();
  }

  shouldDisplayEventForSelectedDate = (event) => {
    return new Date(event.time).getDate() === this.state.selectedDate;
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
  
  getDateItemColor(i){
    return this.state.selectedIndex === i ? '#F56897': 'black';
  }

  renderDateItem(date, i) {
    return (
      <TouchableOpacity onPress={() => this.dateItemPressed(date, i)} key={date} style={[styles.dateItem, this.state.selectedIndex === i && styles.dateItemSelected]}>
        <Text color={this.getDateItemColor(i)} >{date}</Text>
        <Text color={this.getDateItemColor(i)} text100>{i + getNumericalStartingDate()}</Text>
      </TouchableOpacity>
    );
  }

  dateItemPressed(date, i) {
    const newDate = moment(MIDBURN_STARTING_DATE, 'x').add(i, 'day');
    this.selectedDate(newDate);
    this.setState(_.merge(this.state, { selectedDate: newDate, selectedIndex: i }));
  }

  selectedDate(date) {
    giftsActions.presentGiftsByDate(date);
  }

  renderDatePicker() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            this.state.dates.map((date, i) => this.renderDateItem(date, i))
          }
        </ScrollView>
    );
  }
  renderPublicTab(){
    return (
      <EventsComponent gifts={this.props.gifts} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDatePicker()}
        {this.renderPublicTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateItem: {
    height: 65,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getPresentedGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

