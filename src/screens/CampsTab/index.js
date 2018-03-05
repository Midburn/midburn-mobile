import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'remx';
import CampRow from './CampRow';
import SCREEN_NAMES from './../screenNames';
import * as campsStore from '../../stores/camps/store';

class CampsTab extends Component {

  _onRowPressed = async (data) => {
    this.props.navigator.push({
      screen: SCREEN_NAMES.CAMP_SCREEN,
      passProps: {data},
      title: data.name_en
    })
  }

  _renderRow = (data) => {
    return (
      <CampRow data={data.item} onPress={this._onRowPressed}/>
    );
  }

  render() {
    return (
      <View center>
        <FlatList
          data={this.props.campsData}
          renderItem={this._renderRow}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

function mapStateToProps() {
  return {
    campsData: campsStore.getters.getCamps()
  };
}

export default connect(mapStateToProps)(CampsTab);
