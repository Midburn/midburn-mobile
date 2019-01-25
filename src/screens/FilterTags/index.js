import _ from 'lodash';
import React, {Component} from 'react';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {Text, View, Button, TabBar} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import * as giftsActions from '../../stores/gifts/actions';
import TagsComponent from '../components/TagsComponent';
import Strings from '../../utils/Strings';

const CLOSE_IMAGE = require('../../../data/img/close.png');
const IS_IOS = Platform.OS === 'ios';

class FilterTagsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };

  constructor(props) {
    super(props);
    this.tags = _.map(this.props.tags, 'id');

    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  onNavigatorEvent(event) {
    if (!IS_IOS) {
      switch (event.id) {
        case 'willDisappear':
          giftsActions.dismissFilterScreen(this.props.navigator, true);
          break;
      }
    }
  }

//PLATFORM_ANDROID && event.id === 'backPress')

  onClosePressed = () => {
    giftsActions.dismissFilterScreen(this.props.navigator);
  };

  onClearPressed = () => {
    giftsStore.setters.cleanFilters();
  }


  _renderHeader() {
    return (
      <View row spread padding-8>
        <Button
          link
          onPress={this.onClosePressed}
          iconSource={CLOSE_IMAGE}
          iconStyle={{width: 20, height: 20}}
        />
        <Button
          link
          label={Strings('CLEAN_FILTER')}
          onPress={this.onClearPressed}
          labelProps={{style: {fontWeight: '600'}, blue30: true, text60: true}}
        />

      </View>
    );
  }

  _onTagPressed = (tag) => {
    giftsStore.setters.toggleTagFilter(tag);
  }

  _onApplyFilterPress = () => {
    giftsActions.dismissFilterScreen(this.props.navigator);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View paddingH-12 flex bg-white paddingV-8>
          {this._renderHeader()}
          <View paddingT-22 flex>
            <ScrollView>
              <TagsComponent
                tags={this.tags}
                context={'gifts'}
                fullScreen={true}
                onTagPressed={this._onTagPressed}
                filteredDesign={true}
              />
              <View paddingT-54 center>
                <Button
                  onPress={this._onApplyFilterPress}
                  label={Strings('APPLY_FILTER')}
                  size={'medium'}
                  labelStyle={{ fontWeight: '600'}}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}



function mapStateToProps() {
  return {
    tags: giftsStore.getters.getGiftsTags()
  };
}

export default connect(mapStateToProps)(FilterTagsScreen);

