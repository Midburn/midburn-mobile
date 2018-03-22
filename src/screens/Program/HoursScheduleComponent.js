import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';

const DARK_GRAY = '#C9C9C9';
const MID_GRAY = '#E4E4E4';
const LIGHT_GRAY = '#D7D7D7';
const HALF_AN_HOUR = 0.5;

export class HoursScheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsByHour: getUpcomingEventsGroupedByHour(props.events)
    }
  }

  renderContent() {
    const rows = [];
    for (let hour = this.props.firstHour; hour < this.props.lastHour; hour += HALF_AN_HOUR) {
      rows.push(
        <ScheduleRow
          isOddRow={Number.isInteger(hour)}
          isFirstRow={hour === this.props.firstHour}
          key={hour}
          highlightCurrentTime={this.props.highlightCurrentTime}
          hour={hour}
          events={this.state.eventsByHour[hour % 24] || []} />
      );
    }
    return rows;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderContent()}
      </ScrollView>);
  }
}

class ScheduleRow extends Component {
  shouldHighlightRow() {
    return this.props.highlightCurrentTime && this.props.hour === convertTimestampToScheduleHourFormat(Date.now());
  }
  render() {
    return (<View style={styles.row}>
      <Text text80 style={[styles.time, this.props.isOddRow? styles.oddRow : styles.evenRow, this.shouldHighlightRow() && styles.boldText]} key={this.props.hour}>
        {getTimeAsFormatedString(this.props.hour % 24)}
      </Text>
      <View style={styles.eventContaier}>
        {this.props.events.map(event =>
          <Text key={event.name} text100 style={styles.event}>{event.name}</Text>
        )}
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_GRAY,
    width: '100%'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  oddRow: {
    backgroundColor: MID_GRAY
  },
  evenRow: {
    backgroundColor: LIGHT_GRAY
  },
  boldText: {
    fontWeight: 'bold'
  },
  event: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
  eventContaier: {
    display: 'flex',
    flexDirection: 'row'
  },
  time: {
    textAlign: 'center',
    width: 100,
    paddingTop: 10,
    paddingBottom: 10
  }
});

const getTimeAsFormatedString = (time) => {
  return Number.isInteger(time) ? `${time}:00` : `${Math.floor(time)}:30`
};

const getUpcomingEventsGroupedByHour = (events) => {
  const eventsByHour = {};
  events
    .filter(event => event.start >= Date.now())
    .forEach(event => {
      const start = convertTimestampToScheduleHourFormat(event.start);
      eventsByHour[start] = eventsByHour[start] || [];
      eventsByHour[start].push(event);
    });
  return eventsByHour;
}
const convertTimestampToScheduleHourFormat = (timestamp) => {
  let hour = new Date(timestamp).getHours() + (new Date(timestamp).getMinutes() / 60)
  const integerPart = parseInt(hour);
  const floatPart = hour % 1;
  return floatPart >= 0.5 ? integerPart + 0.5 : integerPart;
};

HoursScheduleComponent.propTypes = {
  events: PropTypes.array,
  lastHour: PropTypes.number,
  firstHour: PropTypes.number,
  highlightCurrentTime: PropTypes.bool
}
HoursScheduleComponent.defaultProps = {
  firstHour: convertTimestampToScheduleHourFormat(Date.now()),
  lastHour: convertTimestampToScheduleHourFormat(Date.now()) + 12,
  highlightCurrentTime: true
}