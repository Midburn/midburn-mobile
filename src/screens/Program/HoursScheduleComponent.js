import React, { Component } from 'react';
import { Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import PropTypes from 'prop-types';
import {Styles} from './Styles'; 

const HALF_AN_HOUR = 0.5;

export class HoursScheduleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsByHour: getUpcomingEventsGroupedByHour(props.events)
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.events !== nextProps.events){
      this.setState({eventsByHour: getUpcomingEventsGroupedByHour(nextProps.events)})
    }
  }

  renderContent() {
    const rows = [];
    for (let hour = this.props.firstHour; hour < 24; hour += HALF_AN_HOUR) {
      rows.push(
        <ScheduleRow
          onEventPressed={this.props.onEventPressed}
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
      <ScrollView style={Styles.hourTableContainer}>
        {this.renderContent()}
      </ScrollView>);
  }
}

class ScheduleRow extends Component {
  shouldHighlightRow() {
    return this.props.highlightCurrentTime && this.props.hour === convertTimestampToScheduleHourFormat(Date.now());
  }

  render() {
    return (<View style={[Styles.hourTableRow, this.props.isOddRow ? Styles.hourTableOddRow : Styles.hourTableEvenRow]}>
      <Text text80 style={[Styles.timeCell, this.shouldHighlightRow() && Styles.boldText]} key={this.props.hour}>
        {getTimeAsFormatedString(this.props.hour % 24)}
      </Text>
      <View style={Styles.eventContaier}>
        {this.props.events.map(event =>
          <TouchableOpacity key={event.title} onPress={() => this.props.onEventPressed(event)}>
            <Text text100  style={Styles.event}>{event.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>);
  }
}

const getTimeAsFormatedString = (time) => {
  return Number.isInteger(time) ? `${time}:00` : `${Math.floor(time)}:30`
};

const getUpcomingEventsGroupedByHour = (events) => {
  const eventsByHour = {};
  events
    .filter(event => event.time >= Date.now())
    .forEach(event => {
      const start = convertTimestampToScheduleHourFormat(event.time);
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
  events: PropTypes.array.isRequired,
  firstHour: PropTypes.number,
  highlightCurrentTime: PropTypes.bool.isRequired,
  onEventPressed: PropTypes.func.isRequired,
}
HoursScheduleComponent.defaultProps = {
  firstHour: convertTimestampToScheduleHourFormat(Date.now()),
  highlightCurrentTime: true
}