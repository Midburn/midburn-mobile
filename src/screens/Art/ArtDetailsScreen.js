import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {View, Button, PageControl, Colors} from 'react-native-ui-lib';
import {ArtCarousel} from './ArtCarousel';
import String, {isRTL} from '../../utils/Strings';
import * as actions from '../../stores/campsAndArt/actions';
import {Text} from '../components/Text';


export default class ArtDetailsScreen extends PureComponent {

  constructor(props) {
    super(props);
    this.description = isRTL() ? this.props.art.description : this.props.art.descriptionEn;
    this.title = isRTL() ? this.props.art.title : this.props.art.titleEn;
    this.name = isRTL() ? this.props.art.name : this.props.art.nameEn;


  }

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
          numOfPages={this.props.images.length}
          currentPage={this.state.currentPage}
          inactiveColor={Colors.dark70}
          color={Colors.dark30}
          enlargeActive
          containerStyle={{bottom: 15}}
        />
      </View>
    );
  }

  renderDescription() {
    return (
      <View marginT-20>
        <Text text80 style={{fontWeight: '500', writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.description}</Text>
      </View>
    );
  }

  renderTitle() {
    return (
      <View center marginT-30>
        <Text text70 style={{fontWeight: '600', writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.title}</Text>
      </View>
    );
  }

  renderName() {
    return (
      <View center marginT-30>
        <Text text50 style={{fontWeight: '700', writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.name}</Text>
      </View>
    );
  }

  renderArtist() {
    return (
      <View center marginT-30>
        <Text text70 style={{fontWeight: '600', writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{this.props.art.artist}</Text>
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
      <View bg-dark70 padding-10 marginT-12 br30>
        <Button
          link
          label={String('ART_FEEDBACK')}
          labelProps={{numberOfLines: 2, center: true, blue30: true, text70: true, style: {fontWeight: '500'}}}
          onPress={this._onSharePress}
        />
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#F2F4F5'}}>
        {this.renderImages()}
        <View flex margin-30 marginT-0>
          {this.renderName()}
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
