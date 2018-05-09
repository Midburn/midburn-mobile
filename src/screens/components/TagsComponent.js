import _ from 'lodash';
import React, {Component} from 'react';
import {View, Colors} from 'react-native-ui-lib';
import {getTagColor} from '../../utils/Colors';
import * as campsAndArtStore from "../../stores/campsAndArt/store";
import * as giftsStore from "../../stores/gifts/store";
import {isRTL} from '../../utils/Strings';
import Tag from './TagComponent';



export default class TagsComponent extends Component {


  _getTitle(tag) {
    if (this.props.context === 'camps') {
      return campsAndArtStore.getters.getCampTagTitleForId(tag);
    } else if (this.props.context === 'gifts') {
      return giftsStore.getters.getGiftTagTitleForId(tag);
    }
  }

  _renderTag(tag, index) {
    return (
      <Tag
        tag={tag}
        key={`${tag}-${index}`}
        text={this._getTitle(tag)}
        borderColor={getTagColor(tag).color}
        textColor={getTagColor(tag).textColor}
        bigTag={this.props.fullScreen}
        onPress={this.props.onTagPressed}
        filtered={giftsStore.getters.getFilterForTagId(tag)}
        filteredDesign={this.props.filteredDesign}
      />
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
