import React, {Component} from 'react';
import {View, Button, Colors} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
import {Text} from '../components/Text';



export default class TagsComponent extends Component {

  render(tag, index) {
    return (
      <View
        centerV
        key={index}
        style={{
          borderRadius: this.props.bigTag ? 20 :10,
          borderWidth: this.props.bigTag ? 2 : 1,
          borderColor: this.props.borderColor,
          padding: 4,
          paddingHorizontal: 8,
          marginRight: isRTL() ? 0 : 8,
          marginLeft: isRTL() ? 8 : 0,
          marginTop: 8
        }}>
        <Text text100 text60={this.props.bigTag} color={this.props.textColor} style={{fontWeight: '600'}}>{this.props.text}</Text>
      </View>
    );
  }
}
