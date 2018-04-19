import React, {Component} from 'react';
import {FlatList, Platform} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import ArtRow from './ArtRow';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';
import SearchBar from '../components/SearchBar';

const SEARCH_BUTTON_ID = 'camp_search';
const PLACEHOLDER_SEARCH_INPUT = 'Type art to search';
const ANDROID_SEARCH_ICON = require('../../../data/img/search.png');
const IS_IOS = Platform.OS === 'ios';

const FILTER = {
  CAMPS: 'Camps',
  ART: 'Art'
};


class ArtScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'camp_search',
        systemItem: 'search',
        icon: IS_IOS ? undefined : ANDROID_SEARCH_ICON
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
  }


  _onRowPressed = async (art, images) => {
    actions.showArtScreen({art, navigator: this.props.navigator, images});
  }

  _onFavouriteFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.ART);

  }

  _renderRow = (data) => {
    return (
      <ArtRow
        data={data.item}
        title={data.item.name}
        tags={data.item.tags}
        imageSource={store.getters.getArtImage(data.item.artId)}
        onPress={() => this._onRowPressed(data.item, store.getters.getArtImages(data.item.artId))}
      />
    );
  }

  onTextChanged = (text) => {
    store.setters.setSearchArt(text)
  }


  _renderSearchBar() {
    return (
      <View paddingH-15 marginT-15>
        <SearchBar
          onChangeText={this.onTextChanged}
          value={this.state.text}
          placeholder={PLACEHOLDER_SEARCH_INPUT}
          textInputRef={(ref) => this.searchTextInputRef = ref}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return index;
  }

  renderArtList() {
    return (
      <FlatList
        key={'art'}
        style={{padding: 15}}
        data={this.props.artData}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        initialNumToRender={50}
      />
    );
  }


  render() {
    return (
      <View flex>
        {this.state.showSearchBar && this._renderSearchBar()}
        {this.renderArtList()}
      </View>
    );
  }
}

function mapStateToProps() {
  return {
    artData: store.getters.getArtDataToShow(),
    searchText: store.getters.getSearchText(),
    selectedTab: store.getters.getSelectedTab(),
    selectedTagIndex: store.getters.getSelectedTagIndex()
  };
}

export default connect(mapStateToProps)(ArtScreen);
