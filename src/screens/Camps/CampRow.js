import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Card, View, Colors} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {isRTL} from '../../utils/Strings';
import Tags from '../components/TagsComponent';
import {Text} from '../components/Text';




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class CampsTab extends PureComponent {

  constructor(props) {
    super(props);
    this.tags = this.props.camp.tags || _.times(getRandomInt(1, 6), getRandomImage);
    this.title = isRTL() ? this.props.camp.campName : this.props.camp.campNameEn;
    this.description = isRTL() ? this.props.camp.description : this.props.camp.descriptionEn;
  }

  _onPress = () => {
    this.props.onPress(this.props.camp);
  }

  _renderTags() {
    return (
      <Tags tags={this.props.camp.tags} context={'camps'}/>
    );
  }

  _renderTexts() {
    return (
      <View right={isRTL()}>
        <Text text60 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.title}</Text>
        <Text text70 marginT-12 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.description}</Text>
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
