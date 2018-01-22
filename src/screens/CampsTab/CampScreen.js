import React, {Component} from 'react';
import {Text, View, Button} from 'react-native-ui-lib';



export default class MapTab extends Component {

  render() {
    return (
      <View flex center >
        <Text>
          {JSON.stringify(this.props.data)}
        </Text>
      </View>
    );
  }
}
