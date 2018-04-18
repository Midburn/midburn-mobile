import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, Image, Dimensions, Linking} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {EventsComponent} from './../Now/EventsComponent';
import * as store from '../../stores/campsAndArt/store';
import * as actions from '../../stores/campsAndArt/actions';
import {isRTL} from '../../utils/Strings';


export default class ArtScreen extends Component {
  renderCoverImage() {
    return (
      <View bg-black>
        <Image
          resizeMode={'contain'}
          // style={{width: IMAGE_SIZE.width, height: IMAGE_SIZE.height}}
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

  renderTitle() {
    return (
      <View center marginT-30>
        <Text text40>{this.props.camp.title}</Text>
      </View>
    );
  }

  render() {
    return (
      <View flex>
        <ScrollView style={{backgroundColor: '#F2F4F5'}}>
          {this.renderCoverImage()}
          <View flex margin-30 marginT-0>
            {/* {this.props.camp.title && this.renderTitle()}
            {this.props.camp.description && this.renderDescription()} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
