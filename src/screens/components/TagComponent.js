import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Button, Colors} from 'react-native-ui-lib';

function getTagColor(tag) {

  const lowerCaseTag = _.toLower(tag);
  switch(lowerCaseTag) {
    case 'adult':
    case 'adults':
      return '#ff4d4d';
    case 'english':
      return '#18dcff';
    case 'alcohol':
      return '#fffa65';
    case 'servesfoodordrinks':
    case 'foodanddrinks':
    case 'physicallydisabled':
      return '#32ff7e';
    case 'kids':
    case 'bodyandsoul':
    case 'games':
      return '#ffcccc';
    case 'party':
    case 'live':
      return '#cd84f1';
    default:
      return Colors.dark70;
  }
}


export default class TagComponent extends Component {


  render() {
    return (
      <View
        key={this.props.index}
        style={{
          backgroundColor: getTagColor(this.props.tagId),
          borderRadius: 10,
          borderWidth: 1,
          borderColor: getTagColor(this.props.tagId),
          padding: 6,
          marginRight: 4,
          marginTop: 12
        }}>
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}
