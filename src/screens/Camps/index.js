import React, {Component} from 'react';
import {FlatList, TextInput, Button} from 'react-native';
import {View} from 'react-native-ui-lib';
import {connect} from 'remx';
import CampRow from './CampRow';
import * as campsStore from '../../stores/camps/store';
import * as actions from './../../stores/camps/actions';

const SEARCH_BUTTON_ID = 'camp_search';
const PLACEHOLDER_SEARCH_INPUT = 'Type camp to serach';

const FILTER = {
  FAVOURITES: 'favourites',
  ABC: 'ABC'
};


class CampsScreen extends Component {

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
    actions.showCampScreen({data, navigator: this.props.navigator});
  }

  _onFavouriteFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.FAVOURITES);

  }

  _onABCFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.ABC);
  }

  _onFilterBarPressed(type) {

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

  _renderFilterBar() {
    return (
      <View row spread bg-dark70 marginT-8>
        <View flex center>
          <Button title={'ABC'} onPress={this._onFavouriteFilterBarPressed}/>
        </View>
        <View flex center>
          <Button title={'Favourite'} onPress={this._onABCFilterBarPressed}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View flex marginH-16>
        {this.state.showSearchBar && this._renderSearchBar()}
        {this._renderFilterBar()}
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

export default connect(mapStateToProps)(CampsScreen);
