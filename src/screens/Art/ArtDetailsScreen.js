import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, Image, Dimensions, Linking} from 'react-native';
import {Text, View, Button, Carousel} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';
import {getRandomCoverImage} from '../../../data/cover-images';
import {EventsComponent} from './../Now/EventsComponent';
import * as store from '../../stores/campsAndArt/store';
import * as actions from '../../stores/campsAndArt/actions';
import {isRTL} from '../../utils/Strings';

const {width} = Dimensions.get('window');

const IMAGE_SIZE = {
  width,
  height: width
};

export default class ArtDetailsScreen extends Component {
  renderImages() {
    return (
      <Carousel>
        {this.props.images.map((image, index) => {
          return this.renderImagePage(image, index);
        })}
      </Carousel>
    );
  }

  renderImagePage(image, index) {
    const Page = ({children, ...others}) => {
      return (
        <View style={{width: IMAGE_SIZE.width}} {...others}>
          {children}
        </View>
      );
    };

    return (
      <Page key={'image' + index}>
        <Image
          resizeMode={'cover'}
          style={{height: 200}}
          source={image}
        />
      </Page>
    );
  }

  renderDescription() {
    return (
      <View marginT-20>
        <Text text70>{this.props.art.description}</Text>
      </View>
    );
  }

  renderTitle() {
    return (
      <View center marginT-30>
        <Text text40>{this.props.art.title}</Text>
      </View>
    );
  }

  renderArtist() {
    return (
      <View center marginT-30>
        <Text text70>{this.props.art.artist}</Text>
      </View>
    );
  }

  renderPhilosophy() {
    return (
      <View center marginT-30>
        <Text text70>{this.props.art.philosophy}</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#F2F4F5'}}>
        {this.renderImages()}
        <View flex margin-30 marginT-0>
          {this.renderTitle()}
          {this.renderDescription()}
          {this.renderArtist()}
          {/* {this.renderPhilosophy()} */}
        </View>
      </ScrollView>
    );
  }
}
