import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, Image, Dimensions, Linking} from 'react-native';
import {Text, View, Button, Colors} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {EventsComponent} from './../Now/EventsComponent';
import * as store from '../../stores/campsAndArt/store';
import * as actions from '../../stores/campsAndArt/actions';
import String from '../../utils/Strings';


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
      <View marginT-20>
        <Text text70>{this.props.camp.description}</Text>
      </View>
    );
  }

  renderSharingBlock() {
    return (
      <View bg-dark70 padding-10 marginT-12>
        <Button link label={String('CAMP_FEEDBACK')} labelProps={{numberOfLines: 2, center: true}} onPress={this._onSharePress} />
      </View>
    );
  }

  _renderTag(text, index) {
    return (
      <View
        key={index}
        style={{borderRadius: 10, borderWidth: 1, borderColor: Colors.dark70, padding: 6, marginRight: 4}}>
        <Text>{text}</Text>
      </View>

    );
  }

  _renderTags() {
    return (
      <View marginT-20>
        <View row>
          {_.map(this.props.camp.tags, (tag, i) => this._renderTag(tag, i))}
        </View>
      </View>
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
      <View marginH-15 right>
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
          <View flex margin-30 marginT-0>
          {this.props.camp.description && this.renderDescription()}
            {this._renderTags()}
            {this.renderSharingBlock()}
          </View>
          {this.state.gifts && this._renderGifts()}
        </ScrollView>
      </View>
    );
  }
}
