import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {getString, isRTL} from '../../utils/Strings';

const TAG_IMAGE_SIZE = 30;

const IMAGE_1 = getRandomImage();
const IMAEG_2 = getRandomImage();
const IMAEG_3 = getRandomImage();

export class EventComponent extends Component {

  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
  }

  _renderHeader() {
    return (
      <Card.Section>
        <View flex right={isRTL()}>
          <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}} text50 color={Colors.dark10}>
            {this.title}
          </Text>
        </View>
      </Card.Section>
    );
  }

  _renderTags() {
    return (
      <View row marginT-8>
        {_.map([IMAGE_1, IMAEG_2, IMAEG_3], (tag, i) =>
          <View marginR-8 key={i}>
            <Image
              source={tag}
              style={{width: TAG_IMAGE_SIZE, height: TAG_IMAGE_SIZE}}
            />
          </View>
        )}
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
          <Text text90 color={this.props.color} style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>
            {this.props.place + ' | '}
          </Text>
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

