import _ from 'lodash';
import React, { Component } from 'react';
import {View, Text, Button, Colors, Image} from 'react-native-ui-lib';
import {BackHandler, Platform} from 'react-native';
import * as store from '../../stores/gifts/store';
import {connect} from 'remx';
import Strings, {isRTL} from '../../utils/Strings';

const IS_IOS = Platform.OS === 'ios';


class SurpriseMeScreen extends Component {

  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.love = isRTL() ? this.props.loveToSpread.description : this.props.loveToSpread.descriptionEn;
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener();
  // }

  _onButtonPress = () => {
    this.props.navigator.dismissModal();
  };

  _renderText(i) {
    return (
      <Text key={i} black text40 text50={!IS_IOS} style={{letterSpacing: 3}}>❤️💛💚💙💜💓💖💗💘</Text>

    );
  }

  render() {
    return (
      <View flex spread padding-8 paddingV-15 bg-white>
        <View column center style={{marginTop: '10%'}}>
          {_.map(_.times(9, String), (str, i) => this._renderText(i))}
        </View>
        <View paddingH-28>
          <Text text40 center color={'#0D47A1'} style={{fontWeight: '500'}}>{this.love}</Text>
        </View>
        <View centerH>
          <Button
            label={Strings("THANKS")}
            onPress={this._onButtonPress}
            backgroundColor={'#E91E63'}
            size={'large'}
            labelStyle={{fontWeight: '600', color: 'white'}}
          />
        </View>

      </View>
    );
  }
}

function mapStateToProps() {
  return {
    loveToSpread: store.getters.getLoveToSpread()
  };
}

export default connect(mapStateToProps)(SurpriseMeScreen);
