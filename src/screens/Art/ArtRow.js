import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Text, View, Card} from 'react-native-ui-lib';
import {tagToImg} from '../../../data/img';


const AVARTAR_SIZE = 30;
const AVATAR_MARGIN = 4;
const AVATAR_CONTAINER_WIDTH = AVARTAR_SIZE*2 + AVATAR_MARGIN*4;

export default class ArtRow extends PureComponent {

  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPress(this.props.artId);
  }

  render() {
    return (
      <Card onPress={this._onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Image height={120} imageSource={this.props.imageSource} />
        <Card.Section style={{flexDirection: 'row', alignItems: 'center'}} body>
          <Text text50>{this.props.title}</Text>
        </Card.Section>

      </Card>
    );
  }
}
