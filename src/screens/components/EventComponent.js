import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getString, isRTL} from '../../utils/Strings';
import * as campsAndArtStore from '../../stores/campsAndArt/store';

import Tag from './../components/TagComponent';



export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
    this.tags = _.map(this.props.tags, (tagId) => {
      return campsAndArtStore.getters.getGiftTagTitleForId(tagId);
    });


  }

  _renderHeader() {
    return (
      <Card.Section>
        <View flex right={isRTL()}>
          <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}} text40 color={Colors.dark10}>
            {this.title}
          </Text>
        </View>
      </Card.Section>
    );
  }

  _renderTag(tag, index) {
    const tagTitle = campsAndArtStore.getters.getGiftTagTitleForId(tag);;
    return (
      <Tag text={tagTitle} tagId={tag} index={index} key={index}/>
    );
  }

  _renderTags() {
    return (
      <View row style={{flexWrap: 'wrap'}}>
        {_.map(this.props.tags, (tag, i) => this._renderTag(tag, i))}
      </View>
    );
  }

  _renderBody() {
    return (
      <Card.Section>
        <View flex column right={isRTL()}>
          <Text text90 color={Colors.dark10}>
            {this.description}
          </Text>
          {this._renderTags()}
        </View>
      </Card.Section>
    );
  }

  _renderFooter() {
    return (
      <Card.Section footer>
        <Card.Item>
          {/*<Text text90 color={this.props.color} style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>*/}
            {/*{this.props.place + ' | '}*/}
          {/*</Text>*/}
          <Text text90 color={'black'}> {this.props.time}</Text>
        </Card.Item>
        <Card.Item>
          <Text style={{marginRight: 10}} text90>
            {this.address}
          </Text>
        </Card.Item>
      </Card.Section>
    );
  }

  render() {
    return (
      <Card key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section body>
          {this._renderHeader()}
          {this._renderBody()}
          {this._renderFooter()}
        </Card.Section>
      </Card>
    );
  }

  renderTag() {
    return (
      <View>
        <Text>Sound</Text>
      </View>
    );
  }
}

