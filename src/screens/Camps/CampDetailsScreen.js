import React, {Component} from 'react';
import {ScrollView, Image, Dimensions} from 'react-native';
import {View, Button, Colors} from 'react-native-ui-lib';
import {EventsComponent} from './../Now/EventsComponent';
import * as store from '../../stores/campsAndArt/store';
import * as actions from '../../stores/campsAndArt/actions';
import String from '../../utils/Strings';
import {Text} from '../components/Text';
import Tags from '../components/TagsComponent';
import {isRTL} from '../../utils/Strings';




const {width} = Dimensions.get('window');

const IMAGE_SIZE = {
  width,
  height: width
};

export default class CampDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifts: []
    }
    this.description = isRTL() ? this.props.camp.description : this.props.camp.descriptionEn;
  }

  componentWillMount() {
    this.setState({gifts: store.getters.getCampGiftForId(this.props.camp.campId)});
  }


  _onSharePress = () => {
    actions.openEmailFeedback({campId: this.props.camp.campId});
  }

  renderTextIfExists(description, data) {
    return data && <Text text80>{`${description}: ${data}`}</Text>
  }

  renderCoverImage() {
    return (
      <View bg-black>
        <Image
          resizeMode={'contain'}
          style={{width: IMAGE_SIZE.width, height: IMAGE_SIZE.height}}
          source={this.props.coverImage}
        />
      </View>
    );
  }

  renderDescription() {
    return (
      <View marginV-20>
        <Text text70>{this.description}</Text>
      </View>
    );
  }

  renderSharingBlock() {
    return (
      <View bg-dark70 padding-10 marginT-22 br30>
        <Button link label={String('CAMP_FEEDBACK')} labelProps={{numberOfLines: 2, center: true}} onPress={this._onSharePress} />
      </View>
    );
  }

  _renderTags() {
    return (
      <Tags tags={this.props.camp.tags} context={'camps'}/>
    );
  }

  renderGiftsList() {
    return (
      <EventsComponent
        gifts={this.state.gifts}
      />
    );
  }

  renderHeader(text) {
    return (
      <View marginH-15 right={isRTL()}>
        <Text text50>{text}</Text>
      </View>
    );
  }

  _renderGifts() {
    return (
      <View flex>
        {this.renderHeader(String('GIFTING'))}
        {this.renderGiftsList()}
      </View>
    )
  }

  render() {
    return (
      <View flex>
        <ScrollView style={{backgroundColor: '#F2F4F5'}}>
          {this.renderCoverImage()}
          <View flex margin-15 marginT-0>
          {this.description && this.renderDescription()}
            {this._renderTags()}
            {this.renderSharingBlock()}
          </View>
          {this.state.gifts && this._renderGifts()}
        </ScrollView>
      </View>
    );
  }
}
