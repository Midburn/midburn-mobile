import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {View, TabBar, TextInput, Text} from 'react-native-ui-lib';
import {connect} from 'remx';
import CampRow from './../Camps/CampRow';
import * as store from '../../stores/campsAndArt/store';
import * as actions from './../../stores/campsAndArt/actions';

const SEARCH_BUTTON_ID = 'camp_search';
const FAVOURITES_BUTTON_ID = 'camp_favourites';
const PLACEHOLDER_SEARCH_INPUT = 'Type camp to serach';


class FavouritesScreen extends Component {


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


  renderList() {
    return (
      <FlatList
        key={'camps'}
        style={{padding: 15, backgroundColor: '#74b9ff'}}
        data={this.props.data}
        renderItem={this.props.renderRow}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
      />
    );
  }


  render() {
    return (
      <View flex>
        {this.renderList()}
      </View>
    );
  }
}


export default FavouritesScreen;
