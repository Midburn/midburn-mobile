import React, {Component} from 'react';
import {Text, View, Button} from 'react-native-ui-lib';

export default class CampsTab extends Component {

  _onPress = () => {
    this.props.onPress(this.props.data);
  }

  render() {
    return (
      <View flex center paddingV-10>
        <Button link linkColor={'black'} label={this.props.data.name_en} onPress={this._onPress}/>
      </View>
    );
  }
}
