import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import CampRow from './CampRow';
import Navigation from 'react-native-navigation';
import SCREEN_NAMES from './../screenNames';


const data = require('../../../data/camps');

export default class CampsTab extends Component {

  static get navigationOptions() {
    return {
      topBar: {
        title: 'CAMPS',
        textColor: 'black',
        drawUnder: false
      }
    };
  }


  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.ToPublish),
    };
  }

  _onRowPressed = async (data) => {
    await Navigation.push(this.props.containerId, {
      name: SCREEN_NAMES.MAP,
      passProps: {
        data
      }
    });

  }


  _renderRow = (data) => {
    return (
      <CampRow data={data} onPress={this._onRowPressed}/>
    );
  }

  render() {
    return (
      <View center>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
});
