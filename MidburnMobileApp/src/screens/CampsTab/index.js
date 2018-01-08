import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

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


  _renderRow = (data) => {
    return (
      <View style={{flex: 1, margin: 5, backgroundColor: 'green'}}>
        <Text style={{color: '#ecf0f1'}}>{data.name_en}</Text>
      </View>
    );

  }

  render() {
    return (
      <View style={styles.container}>
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
