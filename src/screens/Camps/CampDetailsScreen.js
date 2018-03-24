import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, Image, Dimensions} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {getRandomImage} from '../../../data/img';

const COVER_IMAGE_EXAMPLE = require('./../../../data/cover-images/cover.jpg');
const SAHRE_FEELINGS_TEXT = 'Share with us your feeling & thought about this camp';
const {height, width} = Dimensions.get('window');
const ICON_SIZE = 30;

const IMAGE_SIZE = {
  width,
  height: height/3
}
export default class CampDetailsScreen extends Component {

  renderTextIfExists(description, data) {
    return data && <Text text80>{`${description}: ${data}`}</Text>

  }

  renderCoverImage() {
    console.log('RANG', 'renderCoverImage', this.props.data.coverUrl);
    return (
      <View>
        <Image
          style={{width: IMAGE_SIZE.width, height: IMAGE_SIZE.height}}
          source={COVER_IMAGE_EXAMPLE}
        />
      </View>
    );
  }

  renderDescription() {
    return (
      <View marginT-20>
        <Text text70>{this.props.data.description}</Text>
      </View>
    );
  }

  renderTitle() {
    return (
      <View center marginT-30>
        <Text text40>{this.props.data.title}</Text>
      </View>
    );
  }

  renderSharingBlock() {
    return (
      <View bg-dark70 padding-10 marginT-12>
        <Button link label={SAHRE_FEELINGS_TEXT} labelProps={{numberOfLines: 2, center: true}}/>
      </View>
    );
  }

  renderIcons() {
    return (
      <View row marginT-30>
        {_.map(this.props.data.tags, (tag, i) => {
            return (
              <View marginR-6 key={i}>
                <Image
                  style={{width: ICON_SIZE, height: ICON_SIZE}}
                  source={getRandomImage()}
                />
              </View>
            );

          }

        )}

      </View>
    );
  }

  render() {
    return (
      <View flex >
        <ScrollView style={{backgroundColor: '#F2F4F5'}}>
          {this.renderCoverImage()}
          <View flex margin-30 marginT-0>
            {this.renderTitle()}
            {this.renderIcons()}
            {this.renderDescription()}
            {this.renderSharingBlock()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
