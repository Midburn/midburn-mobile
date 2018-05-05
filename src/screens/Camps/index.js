import React, {Component} from 'react';
import {FlatList, Platform} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import CampRow from './CampRow';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';
import SearchBar from '../components/SearchBar';
import Strings, {isRTL} from '../../utils/Strings';


const SEARCH_BUTTON_ID = 'camp_search';
const FAVOURITES_BUTTON_ID = 'camp_favourites';
const ANDROID_SEARCH_ICON = require('../../../data/img/search.png');
const IS_IOS = Platform.OS === 'ios';


class CampsScreen extends Component {


  static navigatorButtons = {
    rightButtons: [
      {
        id: SEARCH_BUTTON_ID,
        systemItem: 'search',
        [!IS_IOS ? 'icon' : undefined]: ANDROID_SEARCH_ICON
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
    if (event.id === SEARCH_BUTTON_ID) {
      this.setState({showSearchBar: !this.state.showSearchBar});
      store.setters.setSearchCamp();
      if (this.searchTextInputRef) {
        this.searchTextInputRef.focus();
      }
    }

    if (event.id === FAVOURITES_BUTTON_ID) {
      actions.showFavouritesScreen(this.props.navigator, '', this._renderRow, this._onRowPressed);
    }
  }

  _onRowPressed = async (camp) => {
    actions.showCampScreen({camp, navigator: this.props.navigator});
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
      <View paddingH-15 marginT-15>
        <SearchBar
          onChangeText={this.onTextChanged}
          value={this.state.text}
          placeholder={Strings('SERACH_CAMP_PLACEHOLDER')}
          textInputRef={(ref) => this.searchTextInputRef = ref}
        />
      </View>
    );
  }

  // _renderSearchBar() {
  //   return (
  //     <View paddingH-8>
  //       <TextInput
  //         ref={(ref) => this.searchTextInputRef = ref}
  //         autoCorrect={false}
  //         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
  //         onChangeText={this.onTextChanged}
  //         value={this.state.text}
  //         placeholder={PLACEHOLDER_SEARCH_INPUT}
  //       />
  //     </View>
  //   );
  // }


  _keyExtractor = (item, index) => {
    return item.campId;
  }

  renderCampsList() {
    return (
      <FlatList
        key={'camps'}
        style={{padding: 15}}
        data={this.props.campsData}
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
