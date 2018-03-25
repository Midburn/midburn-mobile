import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import { HoursScheduleComponent } from './HoursScheduleComponent';
import * as _ from 'lodash';
import { connect } from 'remx';
import * as giftsStore from '../../stores/gifts/store';

// const MIDBURN_STARTING_DATE = 1526299661000;
const MIDBURN_STARTING_DATE = 1522092866000; //fake date for presentation, set to 26.3

const getNumericalStartingDate = () => {
  return new Date(MIDBURN_STARTING_DATE).getDate();
}

class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      selectedDate: getNumericalStartingDate()
    }
  }

  shouldDisplayEventForSelectedDate = (event) => {
    return new Date(event.time).getDate() === this.state.selectedDate;
  }

  getFirstHourToShow() {
      if(this.state.selectedDate === new Date().getDate()) {
        return new Date().getHours();
      } else {
        return 0;
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              this.state.dates.map((date, i) => this.renderDateItem(date, i))
            }
          </ScrollView>
        </View>
        <HoursScheduleComponent events={this.props.gifts.filter(this.shouldDisplayEventForSelectedDate)} firstHour={this.getFirstHourToShow()}  highlightCurrentTime={false} navigator={this.props.navigator} />
      </View>
    );
  }

  renderDateItem(date, i) {
    return (
      <TouchableOpacity onPress={() => this.dateItemPressed(date, i)} key={date} style={[styles.dateItem, this.state.selectedDate === i + getNumericalStartingDate() && styles.dateItemSelected]}>
        <Text>{date}</Text>
        <Text text100>{i + getNumericalStartingDate()}</Text>
      </TouchableOpacity>
    );
  }

  dateItemPressed(date, i) {
    this.setState(_.merge(this.state, { selectedDate: i + getNumericalStartingDate() }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateItem: {
    height: 35,
    width: 75,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateItemSelected: {
    backgroundColor: 'gray'
  }
});


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

