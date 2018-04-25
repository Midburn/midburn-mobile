import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Text, View, Card} from 'react-native-ui-lib';
import {tagToImg} from '../../../data/img';
import {isRTL} from '../../utils/Strings';


const AVARTAR_SIZE = 30;
const AVATAR_MARGIN = 4;
const AVATAR_CONTAINER_WIDTH = AVARTAR_SIZE*2 + AVATAR_MARGIN*4;

export default class ArtRow extends PureComponent {

  constructor(props) {
    super(props);
    this.title = isRTL() ? this.props.data.name : this.props.data.nameEn;
  }

  render() {
    return (
      <Card onPress={this.props.onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Image height={120} imageSource={this.props.imageSource} />
        <Card.Section style={{flexDirection: 'row', alignItems: 'center'}} body>
          <View flex right={isRTL()}>
            <Text text50>{this.title}</Text>
          </View>
        </Card.Section>

      </Card>
    );
  }
}
