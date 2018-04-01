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
    this.props.onPress(this.props.data);
  }


  _renderSidePanel() {
    return (
      <View style={{width: AVATAR_CONTAINER_WIDTH, flexWrap: 'wrap', alignContent: 'flex-end'}} row spread>
        {_.map(this.props.tags, (src, key) => {
          return (
            <Image
              key={key}
              source={tagToImg(src)}
              style={{width: AVARTAR_SIZE, height: AVARTAR_SIZE, margin: AVATAR_MARGIN}}
            />
          );
        })}
      </View>

    );
  }

  _renderContent() {
    return (
      <View flex row>
        <Text text60 margin-19>{this.props.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <Card onPress={this._onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Image height={120} imageSource={} />
        <Card.Section style={{flexDirection: 'row', alignItems: 'center'}} body>
          <Text text50>{this.props.title}</Text>
        </Card.Section>

      </Card>
    );
  }
}
