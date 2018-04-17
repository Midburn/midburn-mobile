import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import CampRow from './CampRow';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';
import {ART_PLACEHOLDER} from '../../../data/2018/images/arts';


const SEARCH_BUTTON_ID = 'camp_search';
const FAVOURITES_BUTTON_ID = 'camp_favourites';
const PLACEHOLDER_SEARCH_INPUT = 'Type camp to search';


class CampsScreen extends Component {

  static navigatorStyle = {
    navBarButtonColor: '#ed1b68'
  };
  static navigatorButtons = {
    rightButtons: [
      {
        id: SEARCH_BUTTON_ID,
        systemItem: 'search'
      },
      {
        id: FAVOURITES_BUTTON_ID,
        icon: require('../../../data/img/hart_full.png'),
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
      if (this.searchTextInputRef) {
        this.searchTextInputRef.focus();
      }
    }

    if (event.id == FAVOURITES_BUTTON_ID) {
      actions.showFavouritesScreen(this.props.navigator, '', this._renderRow, this._onRowPressed);
    }
  }


  _onRowPressed = async (camp) => {
    actions.showCampScreen({camp, navigator: this.props.navigator});
  }

  _onFavouriteFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.ART);

  }

  _renderRow = (data) => {
    return (
      <CampRow
        camp={data.item}
        imageSource={store.getters.getCampImage(data.item.campId)}
        onPress={this._onRowPressed}
      />
    );
  }

  onTextChanged = (text) => {
    store.setters.setSearchCamp(text)
  }



  _renderSearchBar() {
    return (
      <View paddingH-8>
        <TextInput
          ref={(ref) => this.searchTextInputRef = ref}
          autoCorrect={false}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onTextChanged}
          value={this.state.text}
          placeholder={PLACEHOLDER_SEARCH_INPUT}
        />
      </View>
    );
  }


  _keyExtractor = (item, index) => {
    return index;
  }

  renderCampsList() {
    return (
      <FlatList
        key={'camps'}
        style={{padding: 15}}
        data={this.props.campsData}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        initialNumToRender={30}
      />
    );
  }



  render() {
    return (
      <View flex>
        {this.state.showSearchBar && this._renderSearchBar()}
        {this.renderCampsList()}
      </View>
    );
  }
}

function mapStateToProps() {
  return {
    campsData: store.getters.getCampsDataToShow(),
    searchText: store.getters.getSearchText(),
  };
}

export default connect(mapStateToProps)(CampsScreen);
