import React, {Component} from 'react';
import {Platform, StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {HoursScheduleComponent} from './HoursScheduleComponent';
import * as _ from 'lodash';


const MIDBURN_STARTING_DATE = 14;
//fake events, should be removed!
const events = [{
  name: 'old event',
  start: Date.now() - 40 * 60000,
  end: Date.now() - 10 * 60000
}, {
  name: 'now',
  start: Date.now() + 1 * 60000,
  end: Date.now() + 30 * 60000
},
{
  name: 'now2',
  start: Date.now() + 1 * 60000,
  end: Date.now() + 30 * 60000
}, {
  name: 'two hours from now',
  start: Date.now() + 120 * 60000,
  end: Date.now() + 150 * 60000
}, {
  name: 'half an hour from now',
  start: Date.now() + 30 * 60000,
  end: Date.now() + 200 * 60000
}, {
  name: '40 min from now',
  start: Date.now() + 40 * 60000,
  end: Date.now() + 330 * 60000,
}];

export default class ProgramScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: ["MON", "TUE", "WED", "THU", "FRI", "SAT"],
      selectedDateIndex: 0,
      events: [{
        name: 'Full sun party',
        description: 'Amazing party under the moon',
        camp: 'Valahala',
        time: '15:30'
      },
      {
        name: 'Full sun party',
        description: 'Amazing party under the moon',
        camp: 'Valahala',
        time: '15:30'
      },
      {
        name: 'Full sun party',
        description: 'Amazing party under the moon',
        camp: 'Valahala',
        time: '15:30'
      }]
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
        <HoursScheduleComponent events={events} firstHour={0} lastHour={24} highlightCurrentTime={false} />
      </View>
    );
  }

  renderDateItem(date, i) {
    return (
      <TouchableOpacity onPress={() => this.dateItemPressed(date, i)} key={date} style={[styles.dateItem, this.state.selectedDateIndex === i && styles.dateItemSelected]}>
        <Text>{date}</Text>
        <Text text100>{i + MIDBURN_STARTING_DATE}</Text>
      </TouchableOpacity>
    );
  }

  dateItemPressed(date, i) {
    this.setState(_.merge(this.state, { selectedDateIndex: i }));
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
