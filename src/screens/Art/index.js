import React, {Component} from 'react';
import {BackHandler, FlatList, Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import ArtRow from './ArtRow';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';
import SearchBar from '../components/SearchBar';
import Strings from '../../utils/Strings';
import {backToNowTab} from '../../stores/appActions';

const SEARCH_BUTTON_ID = 'art_search';
const IS_IOS = Platform.OS === 'ios';

const rightButtons = {
  topBar: {
    rightButtons: [
      {
        id: SEARCH_BUTTON_ID,
        systemItem: 'search',
        [!IS_IOS ? 'icon' : undefined]: require('../../../data/img/search.png')
      }
    ],
    leftButtons: []

  }
};

class ArtScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchBar: false
    };
    this.flatListRef = undefined;
    Navigation.events().bindComponent(this);
    Navigation.mergeOptions(this.props.componentId, rightButtons);
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === SEARCH_BUTTON_ID) {

      this.setState({showSearchBar: !this.state.showSearchBar});
      store.setters.setSearchArt();
      if (this.searchTextInputRef) {
        this.searchTextInputRef.focus();
      }
    } else if (event.id === 'didAppear') {
      BackHandler.removeEventListener();
      BackHandler.addEventListener('hardwareBackPress', () => {
        return backToNowTab(this.props.componentId);
      });
    }
  }


  _onRowPressed = async (art, images) => {
    actions.showArtScreen({art, componentId: this.props.componentId, images});
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
    this.flatListRef.scrollToOffset({x: 0, y: 0, animated: true});
    store.setters.setSearchArt(text)
  }


  _renderSearchBar() {
    return (
      <View paddingH-15 marginT-15>
        <SearchBar
          onChangeText={this.onTextChanged}
          value={this.state.text}
          placeholder={Strings('SERACH_ART_PLACEHOLDER')}
          textInputRef={(ref) => this.searchTextInputRef = ref}
        />
      </View>
    );
  }

  _keyExtractor = (item, index) => {
    return item.artId;
  }

  renderArtList() {
    return (
      <FlatList
        ref={(ref) => this.flatListRef = ref}
        key={'art'}
        style={{padding: 15}}
        data={this.props.artData}
        renderItem={this._renderRow}
        keyExtractor={this._keyExtractor}
        initialNumToRender={10}
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
