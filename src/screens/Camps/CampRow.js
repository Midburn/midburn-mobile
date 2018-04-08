import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Text, View, Card} from 'react-native-ui-lib';
import {tagToImg, getRandomImage} from '../../../data/img';

const CAMP_PLACEHOLDER = require('../../../data/img/camp-placeholder.png');
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
  }


  _onPress = () => {
    this.props.onPress(this.props.data);
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

  _renderContent() {
    return (
      <View flex center>
        <Text text60 margin-19>{this.props.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Card onPress={this._onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section style={{flexDirection: 'row', alignItems: 'center'}} body>
          {this._renderSidePanel()}
          <Text text50>{this.props.title}</Text>
        </Card.Section>

      </Card>
    );
  }
}
