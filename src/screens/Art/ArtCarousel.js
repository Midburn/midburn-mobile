import _ from 'lodash';
import React, {Component} from 'react';
import {Image, Dimensions} from 'react-native';
import {Carousel, PageControl, View, Colors} from 'react-native-ui-lib';
import {tagToImg} from '../../../data/img';
import {isRTL} from '../../utils/Strings';

const {width} = Dimensions.get('window');

const IMAGE_SIZE = {
  width,
  height: width
};

export class ArtCarousel extends Component {
  renderImagePage(image, index) {
    const Page = ({children, ...others}) => {
      return (
        <View bg-black style={{width: IMAGE_SIZE.width}} {...others}>
          {children}
        </View>
      );
    };

    return (
      <Page key={'image' + index}>
        <Image
          resizeMode={'contain'}
          style={{height: width, width}}
          source={image}
        />
      </Page>
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Carousel loop onChangePage={(index => this.props.onChangePage(index))}>
        {this.props.images.map((image, index) => {
          return this.renderImagePage(image, index);
        })}
      </Carousel>
    );
  }
}
