import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';

const TAG_IMAGE_SIZE = 30;

const IMAGE_1 = getRandomImage();
const IMAEG_2 = getRandomImage();
const IMAEG_3 = getRandomImage();

export class EventComponent extends Component {
  _renderHeader() {
    return (
      <Card.Section>
        <Text text50 color={Colors.dark10}>
          {this.props.titleEn}
        </Text>
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
        <View column>
          <Text text90 color={Colors.dark10}>
            {this.props.descriptionEn}
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
          <Text text90 color={this.props.color}>
            {this.props.place + ' | '}
          </Text>
          <Text text90 color={'black'}> {this.props.time}</Text>
        </Card.Item>
        <Card.Item>
          <Text style={{marginRight: 10}} text90>
            {this.props.address}
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
