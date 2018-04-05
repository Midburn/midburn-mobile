import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import ArtRow from './ArtRow';
import IndicatorBar from '../components/IndicatorBar';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';

const SEARCH_BUTTON_ID = 'camp_search';
const PLACEHOLDER_SEARCH_INPUT = 'Type camp to serach';

const FILTER = {
  CAMPS: 'Camps',
  ART: 'Art'
};


class ArtScreen extends Component {

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
      if (this.searchTextInputRef) {
        this.searchTextInputRef.focus();
      }
    }
  }


  _onRowPressed = async (data) => {
    actions.showCampScreen({data, navigator: this.props.navigator});
  }

  _onFavouriteFilterBarPressed = () => {
    this._onFilterBarPressed(FILTER.ART);

  }

  _renderRow = (data) => {
    return (
      <ArtRow
        data={data.item}
        campId={data.item.campId}
        title={data.item.nameEn}
        tags={data.item.tags}
        imageUrl={data.item.imageUrl}
        onPress={this._onRowPressed}
      />
    );
  }

  onTextChanged = (text) => {
    store.setters.setSearch(text)
  }

  onTagsFilterPressed = (index) => {
    store.setters.setSelectedTagIndex(index);

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

  renderArtList() {
    return (
      <FlatList
        key={'art'}
        style={{padding: 15, backgroundColor: '#fab1a0' }}
        data={this.props.artData}
        renderItem={this._renderRow}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
      />
    );
  }

  _renderTagsFilterBar() {
    return (
      <IndicatorBar
        itemSize={40}
        items={this.props.tags}
        containerStyle={{padding: 8}}
        selectedIndex={this.props.selectedTagIndex}
        onChangeIndex={this.onTagsFilterPressed}
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
    campsData: store.getters.getCampsDataToShow(),
    artData: store.getters.getArtDataToShow(),
    searchText: store.getters.getSearchText(),
    selectedTab: store.getters.getSelectedTab(),
    selectedTagIndex: store.getters.getSelectedTagIndex(),
    tags: store.getters.getAllTags()
  };
}

export default connect(mapStateToProps)(ArtScreen);
