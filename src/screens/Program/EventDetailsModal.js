import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, View, Text } from 'react-native-ui-lib';
import {EventComponent} from '../Now/EventComponent';

export class EventDetailsModal extends Component {
  dismiss = () => {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }
  render() {
    return (
      <View>
        <Modal.TopBar
          onCancel={this.dismiss}
        />
        {/* <View style={styles.mainContent}>
          <Text>Event Start: {new Date(this.props.event.start).toLocaleDateString()}</Text>
          <Text>Event End: {new Date(this.props.event.end).toLocaleDateString()}</Text>
          <Text>Event Description:</Text>
        </View> */}
         <EventComponent index={0} title={this.props.event.title} place={this.props.event.locationName} time={'12:00'}
                      address={this.props.event.locationAddress} description={this.props.event.description}
                      color={this.props.event.color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    display: 'flex',
    alignItems: 'center'
  }
});