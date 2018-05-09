import _ from 'lodash';
import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, View, Button, TabBar} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import * as campsAndArtStore from '../../stores/campsAndArt/store';
import * as giftsActions from '../../stores/gifts/actions';
import TagsComponent from "../components/TagsComponent";
import Strings from "../../utils/Strings";

const CLOSE_IMAGE = require('../../../data/img/close.png');

class FilterTagsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };


  constructor(props) {
    super(props);
    this.tags = _.map(this.props.tags, 'id');
  }

  onClosePressed = () => {
    giftsActions.dismissFilterScreen(this.props.navigator);
  };

  onClearPressed = () => {
    campsAndArtStore.setters.cleanFilters();
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
        />

      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View marginH-12 flex>
          {this._renderHeader()}
          <View paddingT-22 flex>
            <ScrollView>
              <TagsComponent tags={this.tags} context={'gifts'} fullScreen={true}/>
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

