import React, {PureComponent} from 'react';
import {Card, Colors, View} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
import Tags from '../components/TagsComponent';
import {Text} from '../components/Text';



export default class CampsTab extends PureComponent {

  constructor(props) {
    super(props);
    this.tags = this.props.camp.tags;
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
      <View right={isRTL()} key={this.props.camp.campId}>
        <Text text60 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.title}</Text>
        <Text text70 marginT-12 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.description}</Text>
      </View>
    );
  }


  render() {
    return (
      <Card onPress={this._onPress} key={this.props.camp.campId} containerStyle={{marginBottom: 15}}>
        <Card.Image height={120} imageSource={this.props.imageSource} />
        <Card.Section key={this.props.camp.campId} style={{flexDirection: 'row', alignItems: 'center'}} body>
          <View flex key={this.props.camp.campId}>
            {this._renderTexts()}
            {this._renderTags()}
          </View>
        </Card.Section>
      </Card>
    );
  }
}
