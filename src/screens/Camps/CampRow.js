import React, {PureComponent} from 'react';
import {Card, Colors, View} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
import Tags from '../components/TagsComponent';
import {Text} from '../components/Text';
import {DetailsComponent} from '../components/DetailsComponent';



export default class CampsTab extends PureComponent {

  constructor(props) {
    super(props);
    this.tags = this.props.camp.tags;
    this.title = isRTL() ? this.props.camp.campName : this.props.camp.campNameEn;
    this.description = isRTL() ? this.props.camp.description : this.props.camp.descriptionEn;
    this.location = isRTL() ? this.props.camp.location : this.props.camp.locationEn;
    this.detailsObject = []
  }

  _onPress = () => {
    this.props.onPress(this.props.camp);
  }

  _renderTags() {
    return (
      <Tags tags={this.props.camp.tags} context={'camps'}/>
    );
  }

  _renderDetails() {
    return (
      <DetailsComponent details={[{icon: 'LOCATION', text: this.location}]} />
    );
  }

  _renderTexts() {
    return (
      <View right={isRTL()} key={this.props.camp.campId}>
        <Text black text60 style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '600'}}>{this.title}</Text>
        <Text black text80 marginT-12 style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '500'}}>{this.description}</Text>
      </View>
    );
  }

  _renderImage() {
    return (
      <Card.Image width={'33%'} imageSource={this.props.imageSource}/>
    );
  }


  render() {
    return (
      <Card row onPress={this._onPress} key={this.props.camp.campId} containerStyle={{marginBottom: 15}}>
        {isRTL() && this._renderImage()}
        <Card.Section key={this.props.camp.campId} style={{flexDirection: 'row', alignItems: 'center'}} body>
          <View flex key={this.props.camp.campId}>
            {this._renderTexts()}
            {this._renderDetails()}
            {this._renderTags()}
          </View>
        </Card.Section>
        {!isRTL() && this._renderImage()}
      </Card>
    );
  }
}
