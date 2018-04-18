import React, {PureComponent} from 'react';
import {ScrollView, Image, Linking} from 'react-native';
import {Text, View, Button, PageControl, Colors} from 'react-native-ui-lib';
import {ArtCarousel} from './ArtCarousel';
import String, {isRTL} from "../../utils/Strings";
import * as actions from "../../stores/campsAndArt/actions";

export default class ArtDetailsScreen extends PureComponent {

  state = {
    currentPage: 0,
  };

  onChangePage(index) {
    this.setState({currentPage: index});
  }

  _onSharePress = () => {
    actions.openEmailFeedback({artId: this.props.art.artId});
  }

  renderImages() {
    return (
      <View>
        <ArtCarousel onChangePage={(index => this.onChangePage(index))} images={this.props.images} />
        <PageControl
          numOfPages={this.props.images.length} currentPage={this.state.currentPage} inactiveColor={Colors.dark70} color={Colors.dark30}
          enlargeActive containerStyle={{bottom: 15}}
        />
      </View>
    );
  }

  renderDescription() {
    return (
      <View marginT-20>
        <Text text70 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.props.art.description}</Text>
      </View>
    );
  }

  renderTitle() {
    return (
      <View center marginT-30>
        <Text text50 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.props.art.title}</Text>
      </View>
    );
  }

  renderArtist() {
    return (
      <View center marginT-30>
        <Text text70 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.props.art.artist}</Text>
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

  renderSharingBlock() {
    return (
      <View bg-dark70 padding-10 marginT-12>
        <Button link label={String('ART_FEEDBACK')} labelProps={{numberOfLines: 2, center: true}} onPress={this._onSharePress} />
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
          {this.renderSharingBlock()}

          {/* {this.renderPhilosophy()} */}
        </View>
      </ScrollView>
    );
  }
}
