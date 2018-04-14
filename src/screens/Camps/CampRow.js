import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Card, Text, View, Colors} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {isRTL} from '../../utils/Strings';


const AVARTAR_SIZE = 30;
const AVATAR_MARGIN = 4;
const AVATAR_CONTAINER_WIDTH = AVARTAR_SIZE*2 + AVATAR_MARGIN*4;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class CampsTab extends PureComponent {

  constructor(props) {
    super(props);
    this.tags = this.props.tags || _.times(getRandomInt(1, 6), getRandomImage);
    this.title = isRTL() ? this.props.titleHeb : this.props.titleEn;
    this.description = isRTL() ? this.props.descriptionHeb : this.props.descriptionEn;
  }

  _onPress = () => {
    this.props.onPress(this.props.campId);
  }

  _renderTag(text, index) {
    return (
      <View
        key={index}
        style={{borderRadius: 10, borderWidth: 1, borderColor: Colors.dark70, padding: 6, marginRight: 4, marginTop: 12}}>
        <Text>{text}</Text>
      </View>

    );
  }

  _renderTags() {
    return (
      <View row>
        {_.map(this.tags, (tag, i) => this._renderTag(tag, i))}
      </View>
    );

  }


  _renderSidePanel() {
    return (
      <View style={{width: AVATAR_CONTAINER_WIDTH, flexWrap: 'wrap', alignContent: 'flex-end'}} row spread>
        {_.map(this.tags, (src, key) => {
          return (
            <Image
              key={key}
              source={src}
              style={{width: AVARTAR_SIZE, height: AVARTAR_SIZE, margin: AVATAR_MARGIN}}
            />
          );
        })}
      </View>

    );
  }

  _renderTexts() {
    return (
      <View right={isRTL()}>
        <Text text60>{this.title}</Text>
        <Text text70 marginT-12>{this.descriptionEn}</Text>
      </View>
    );
  }


  render() {
    return (
      <Card onPress={this._onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Image height={120} imageSource={this.props.imageSource} />
        <Card.Section style={{flexDirection: 'row', alignItems: 'center'}} body>
          <View flex>
            {this._renderTexts()}
            {this._renderTags()}
          </View>
        </Card.Section>
      </Card>
    );
  }
}
