import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Button, Colors} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
import {Text} from '../components/Text';



export default class TagsComponent extends Component {
  constructor(props) {
    super(props);
    this.container = this.props.onPress ? TouchableOpacity : View;
  }

  _onPress = () => {
    this.props.onPress(this.props.tag);
  }


  render() {
    const filtered = this.props.filtered && this.props.filteredDesign;
    return (
      <this.container
        onPress={this._onPress}
        centerV
        key={this.props.tag}
        style={{
          backgroundColor: filtered ? this.props.borderColor : Colors.white,
          borderRadius: this.props.bigTag ? 20 :10,
          borderWidth: this.props.bigTag ? 2 : 1,
          borderColor: this.props.borderColor,
          padding: 4,
          paddingHorizontal: 8,
          marginRight: isRTL() ? 0 : 8,
          marginLeft: isRTL() ? 8 : 0,
          marginTop: this.props.bigTag ? 12 : 8
        }}>
        <Text text100 text60={this.props.bigTag} color={filtered ? Colors.white : this.props.textColor} style={{fontWeight: '600'}}>{this.props.text}</Text>
      </this.container>
    );
  }
}
