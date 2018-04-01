import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import CampRow from './CampRow';
import IndicatorBar from '../components/IndicatorBar';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';
import {getRandomImage} from '../../../data/img';

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
      <CampRow
        data={data.item}
        campId={data.item.campId}
        title={data.item.title}
        tags={data.item.tags}
        onPress={this._onRowPressed}
      />
    );
  }

  onTextChanged = (text) => {
    store.setters.setSearch(text)
  }

  onSelectedTabChanged = (index) => {
    store.setters.setSelectedTab(index);
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

  _renderFilterBar() {
    return (
        <TabBar
          selectedIndex={this.props.selectedTab}
          onChangeIndex={this.onSelectedTabChanged}
          ref={element => (this.tabbar = element)}
        >
          <TabBar.Item label={FILTER.CAMPS} />
          <TabBar.Item label={FILTER.ART} />
        </TabBar>
    );
  }

  renderCampsList() {
    return (
      <FlatList
        key={'camps'}
        style={{padding: 15, backgroundColor: '#74b9ff'}}
        data={this.props.campsData}
        renderItem={this._renderRow}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
      />
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


  render() {
    return (
      <View flex>
        {this.state.showSearchBar && this._renderSearchBar()}
        {this.props.selectedTab === 0 ? this.renderCampsList() : this.renderArtList()}
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

export default connect(mapStateToProps)(CampsScreen);
