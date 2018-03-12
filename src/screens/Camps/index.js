import React, {Component} from 'react';
import {View, FlatList, TextInput} from 'react-native';
import {connect} from 'remx';
import CampRow from './CampRow';
import SCREEN_NAMES from './../screenNames';
import * as campsStore from '../../stores/camps/store';

const SEARCH_BUTTON_ID = 'camp_search';
const PLACEHOLDER_SEARCH_INPUT = 'Type camp to serach';

class CampsTab extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'camp_search',
        title: 'search'
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id == SEARCH_BUTTON_ID) {

      this.setState({showSearchBar: !this.state.showSearchBar});
    }
  }


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

  _renderSearchBar() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder={PLACEHOLDER_SEARCH_INPUT}
        />
      </View>
    );
  }

  render() {
    return (
      <View center>
        {this.state.showSearchBar && this._renderSearchBar()}
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
