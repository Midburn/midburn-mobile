import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import * as _ from 'lodash';

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
        
        <ScrollView>
            {
              this.state.events.map((event, i) => this.renderEvent(event, i))
            }
          </ScrollView>
        
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
