import _ from 'lodash';
import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, View, Button, TabBar} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import * as giftsActions from '../../stores/gifts/actions';

const CLOSE_IMAGE = require('../../../data/img/close.png');

class FilterTagsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  onClosePressed = () => {
    giftsActions.dismissFilterScreen(this.props.navigator);
  }


  _rennderHeader() {
    return (
      <View left paddingV-8>
        <Button
          link
          onPress={this.onClosePressed}
          iconSource={CLOSE_IMAGE}
          iconStyle={{width: 20, height: 20}}
        />

      </View>
    );
  }




  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View flex marginL-12>
          {this._rennderHeader()}
          <View flex paddingT-22>
            <ScrollView>
              {_.map(this.props.tags, (tag, index) => {
                return (
                  <View key={index} marginB-8>
                    <Text text40>{tag}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}



function mapStateToProps() {
  return {
    tags: giftsStore.getters.getAllTags()
  };
}

export default connect(mapStateToProps)(FilterTagsScreen);

