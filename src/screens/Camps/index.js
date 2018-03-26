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
  CAMPS: 'Camps',
  ART: 'Art'
};


class CampsScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'camp_search',
        systemItem: 'search'
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
      this.searchTextInputRef.focus();
    }
  }


  _onRowPressed = async (data) => {
    actions.showCampScreen({data, navigator: this.props.navigator});
  }

  _onFavouriteFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.ART);

  }

  _onABCFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.CAMPS);
  }

  _onFilterBarPressed(type) {

  }

  _renderRow = (data) => {
    return (
      <CampRow
        data={data.item}
        campId={data.item.campId}
        title={data.item.title}
        onPress={this._onRowPressed}
      />
    );
  }

  _renderSearchBar() {
    return (
      <View>
        <TextInput
          ref={(ref) => this.searchTextInputRef = ref}
          autoCorrect={false}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => campsStore.setters.setSearch(text)}
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
          <Button title={FILTER.CAMPS} onPress={this._onFavouriteFilterBarPressed} />
        </View>
        <View flex center>
          <Button title={FILTER.ART} onPress={this._onABCFilterBarPressed} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View flex>
        {this.state.showSearchBar && this._renderSearchBar()}
        {this._renderFilterBar()}
        <FlatList
          style={{padding: 15}}
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
    campsData: campsStore.getters.getCampsToShow(),
    searchText: campsStore.getters.getSearchText()
  };
}

export default connect(mapStateToProps)(CampsScreen);
