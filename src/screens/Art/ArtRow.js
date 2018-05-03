import React, {PureComponent} from 'react';
import {Text, View, Card} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
import {DetailsComponent} from '../components/DetailsComponent';


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
        <Card.Section body>
          <View flex center paddingB-8 paddingT-4>
            <Text text50 style={{fontWeight: '600'}}>{this.title}</Text>
          </View><
          View flex center>
            <Text text80 dark50 style={{fontWeight: '400'}}>{this.props.data.artist}</Text>
          </View>
        </Card.Section>

      </Card>
    );
  }
}
