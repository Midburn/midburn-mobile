import React, {Component} from 'react';
import {BackHandler, FlatList, StyleSheet} from 'react-native';
import {View, Text} from 'react-native-ui-lib'
import {getOpenSources} from '../../utils/OpenSources';


export default class OpenSourcesScreen extends Component {

  constructor(props) {
    super(props);
    this.data = getOpenSources();
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }


  _keyExtractor = (item, index) => {
    return index;
  }

  _renderItem = (item, i) => {
    return (
      <View flex paddingV-12 paddingL-16 key={i}>
        <Text text70 black>{item.item.name}</Text>
      </View>
    );
  }

  _renderSeparator = () => {
    return (
      <View bg-dark60 height={StyleSheet.hairlineWidth}/>
    );
  }

  render() {
    return (
      <View flex>
        <FlatList
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
        />

      </View>
    );
  }
}

