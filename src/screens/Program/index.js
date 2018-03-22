import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {HoursScheduleComponent} from './HoursScheduleComponent';
import * as _ from 'lodash';

//fake events, should be removed!
const events = [{
  name: 'old event',
  start: Date.now() - 40 * 60000,
  end: Date.now() - 10 * 60000
}, {
  name: 'now',
  start: Date.now() + 1 * 60000,
  end: Date.now() + 30 *60000
},
{
  name: 'now2',
  start: Date.now() + 1 * 60000,
  end: Date.now() + 30 *60000
},{
  name: 'two hours from now',
  start: Date.now() + 120 *60000,
  end:  Date.now() + 150 *60000
}, {
  name: 'half an hour from now',
  start: Date.now() + 30 *60000,
  end: Date.now() + 200 *60000
},{
  name: '40 min from now',
  start:  Date.now() + 40 *60000,
  end:  Date.now() + 330 *60000,
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
        <View style={{height: 60, backgroundColor: 'gray'}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              this.state.dates.map((date, i) => this.renderDateItem(date, i))
            }
          </ScrollView>
        </View>
        <HoursScheduleComponent events={events} firstHour={0} lastHour={24} highlightCurrentTime={false}/>
      </View>
    );
  }

  renderDateItem(date, i) {

    return (
      <TouchableOpacity onPress={() => this.dateItemPressed(date, i)} key={date} style={{height: 60, width: 100, backgroundColor: this.state.selectedDateIndex === i ? 'gray' : 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Text>{date}</Text>
      </TouchableOpacity>
    );
  }

  renderEvent(event, i) {
    return (
      <View key={event.name + i} style={{backgroundColor: 'white', height: 100, margin: 10, padding: 10}}>
        <Text text60>{event.name}</Text>
        <Text text80>{event.description}</Text>
      </View>
    );
  }

  dateItemPressed(date, i) {
    this.setState(_.merge(this.state, {selectedDateIndex: i}));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  scrollView: {
    backgroundColor: 'gray',
    height: 50
  }
});
