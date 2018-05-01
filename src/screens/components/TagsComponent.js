import _ from 'lodash';
import React, {Component} from 'react';
import {View, Button, Colors} from 'react-native-ui-lib';
import {getTagColor} from '../../utils/Colors';
import * as campsAndArtStore from "../../stores/campsAndArt/store";
import {isRTL} from '../../utils/Strings';
import {Text} from '../components/Text';



export default class TagsComponent extends Component {


  _getTitle(tag) {
    if (this.props.context === 'camps') {
      return campsAndArtStore.getters.getCampTagTitleForId(tag);
    } else if (this.props.context === 'gifts') {
      return campsAndArtStore.getters.getGiftTagTitleForId(tag);
    }
  }

  _renderTag(tag, index) {
    return (
      <View
        centerV
        key={index}
        style={{
          backgroundColor: getTagColor(tag),
          borderRadius: 10,
          borderWidth: 1,
          borderColor: getTagColor(tag),
          padding: 4,
          marginRight: 8,
          marginTop: 8
        }}>
        <Text text90>{this._getTitle(tag)}</Text>
      </View>
    );
  }

  render() {
    return (
      <View row style={{flexWrap: 'wrap'}} right={isRTL()}>
        {_.map(this.props.tags, (tag, i) => this._renderTag(tag, i))}
      </View>
    );
  }
}
