import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, View, Text } from 'react-native-ui-lib';

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
          title={this.props.event.name}
          onCancel={this.dismiss}
        />
        <View style={styles.mainContent}>
          <Text>Event Start: {new Date(this.props.event.start).toLocaleDateString()}</Text>
          <Text>Event End: {new Date(this.props.event.end).toLocaleDateString()}</Text>
          <Text>Event Description:</Text>
        </View>
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