import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getString, isRTL} from '../../utils/Strings';
import * as campsAndArtStore from '../../stores/campsAndArt/store';

import Tags from './TagsComponent';


export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
    this.location = getString(this.props.location, this.props.locationEn);
    this.tags = _.map(this.props.tags, (tagId) => {
      return campsAndArtStore.getters.getGiftTagTitleForId(tagId);
    });
    this.camp = getString(this.props.campHeb, this.props.campEn);
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
  
  _renderTags() {
    return (
      <Tags tags={this.props.tags} context={'gifts'}/>
    );
  }

  _renderBody() {
    return (
      <Card.Section>
        <View flex column right={isRTL()}>
          <Text text90 color={Colors.dark10} style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>
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
          <Text text90 color={'black'}> {this.props.time}</Text>
        </Card.Item>
        <Card.Item>
          <Text style={{marginRight: 10}} text90> {this.camp}</Text>
          
          {/*<Text style={{marginRight: 10}} text90>*/}
            {/*{this.address}*/}
          {/*</Text>*/}
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
}

