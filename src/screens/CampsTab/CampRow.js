import React, {Component} from 'react';
import {Text, View, Button} from 'react-native-ui-lib';

export default class CampsTab extends Component {

  _onPress = () => {
    // console.error('RANG', '_onPress', this.props);
    this.props.onPress(this.props.data);
  }

  render() {
    return (
      <View style={{flex: 1, margin: 5, backgroundColor: 'green'}}>
        <Button link label={this.props.data.name_en} onPress={this._onPress}/>
      </View>
    );
  }
}