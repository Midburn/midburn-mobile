import _ from 'lodash';
import React, {Component} from 'react';
import {View, Button, Colors} from 'react-native-ui-lib';
import {getTagColor} from '../../utils/Colors';
import * as campsAndArtStore from "../../stores/campsAndArt/store";
import * as giftsStore from "../../stores/gifts/store";
import {isRTL} from '../../utils/Strings';
import {Text} from '../components/Text';



export default class TagsComponent extends Component {

  render(tag, index) {
    return (
      <View
        centerV
        key={index}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: this.props.borderColor,
          padding: 4,
          paddingHorizontal: 8,
          marginRight: isRTL() ? 0 : 8,
          marginLeft: isRTL() ? 8 : 0,
          marginTop: 8
        }}>
        <Text text100 color={this.props.textColor} style={{fontWeight: '600'}}>{this.props.text}</Text>
      </View>
    );
  }
}
