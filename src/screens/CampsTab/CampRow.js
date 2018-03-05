import _ from 'lodash';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native-ui-lib';
import {getRandomImagesArray}from '../../../data/img';

export default class CampsTab extends Component {

  constructor(props) {
    super(props);
    this.icons = getRandomImagesArray();
  }


  _onPress = () => {
    this.props.onPress(this.props.data);
  }

  _renderSidePanel() {
    return (
      <View>
        {_.map(this.icons, (src, key) => {
          return (
            <Image key={key} source={src} style={{width: 30, height: 30, margin: 4}}/>
          );
        })}

      </View>
    );
  }

  _renderContent() {
    return (
      <View flex center>
        <Text text60 margin-19>{this.props.data.name_en}</Text>
      </View>
    );
  }

  render() {
    return (
      <View flex bg-dark70 margin-16 marginB-0 paddingV-8 style={{borderRadius: 3}}>
        <TouchableOpacity onPress={this._onPress} style={{flex: 1}}>
          <View row left flex>
            {/* {this._renderSidePanel()} */}
            {this._renderContent()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
