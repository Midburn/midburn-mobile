import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Button, TabBar } from 'react-native-ui-lib';
import { HoursScheduleComponent } from './HoursScheduleComponent';
import * as _ from 'lodash';
import { connect } from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import SCREENS from './../../screens/screenNames';
// const MIDBURN_STARTING_DATE = 1526299661000;
const MIDBURN_STARTING_DATE = 1522092866000; //fake date for presentation, set to 26.3
const events = [{
  title: 'old event',
  time: Date.now() - 40 * 60000,
}, {
  title: 'now',
  time: Date.now() + 1 * 60000,
},
{
  title: 'now2',
  time: Date.now() + 1 * 60000,
}, {
  title: 'two hours from now',
  time: Date.now() + 120 * 60000,
}, {
  title: 'half an hour from now',
  time: Date.now() + 30 * 60000,
}, {
  title: '40 min from now',
  time: Date.now() + 40 * 60000,
}];

const getNumericalStartingDate = () => {
  return new Date(MIDBURN_STARTING_DATE).getDate();
}

class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      selectedDate: getNumericalStartingDate(),
      selectedTabIndex: 0
    }
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
    return this.state.selectedDate === i + getNumericalStartingDate()? '#F56897': 'black';
  }

  renderDateItem(date, i) {
    return (
      <TouchableOpacity onPress={() => this.dateItemPressed(date, i)} key={date} style={[styles.dateItem, this.state.selectedDate === i + getNumericalStartingDate() && styles.dateItemSelected]}>
        <Text color={this.getDateItemColor(i)} >{date}</Text>
        <Text color={this.getDateItemColor(i)} text100>{i + getNumericalStartingDate()}</Text>
      </TouchableOpacity>
    );
  }

  dateItemPressed(date, i) {
    this.setState(_.merge(this.state, { selectedDate: i + getNumericalStartingDate() }));
  }
  handleOnTabChange = (selectedTabIndex) => {
    this.setState({ selectedTabIndex });
  }

  renderPrivateTab() {
    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            this.state.dates.map((date, i) => this.renderDateItem(date, i))
          }
        </ScrollView>
        <HoursScheduleComponent
          // events={this.props.gifts.filter(this.shouldDisplayEventForSelectedDate)} 
          events={events}
          onEventPressed={this.onEventPressed}
          firstHour={this.getFirstHourToShow()}
          highlightCurrentTime={this.isSelectedDateIsCurrentDate()}
        />
      </View>
    );
  }

  renderPublicTab(){
    return (
      <Text>Yogev's component comes here</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabBar
          selectedIndex={this.state.selectedTabIndex}
          onChangeIndex={this.handleOnTabChange}>
          <TabBar.Item label={'Public'} />
          <TabBar.Item label={'Private'} />
        </TabBar>
        {this.state.selectedTabIndex === 0 ? this.renderPublicTab() : this.renderPrivateTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateItem: {
    height: 35,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

