import React, { Component } from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {View} from 'react-native-ui-lib';
import {connect} from 'remx';
import * as giftsStore from '../../stores/gifts/store';
import {EventComponent} from './../Now/EventComponent';

class ProgramScreen extends Component {

  _renderRow(gift, i) {
    return (
      <EventComponent index={i} title={gift.item.title}
                      place={gift.item.locationName}
                      time={'12:00'}
                      address={gift.item.locationAddress}
                      description={gift.item.description}
                      color={gift.item.color}
      />
    );
  }

  renderPublicTab(){
    return (
      <FlatList
        data={this.props.gifts}
        style={{padding: 15}}
        renderItem={this._renderRow}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPublicTab()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateItem: {
    height: 35,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


function mapStateToProps() {
  return {
    gifts: giftsStore.getters.getAllGifts()
  };
}

export default connect(mapStateToProps)(ProgramScreen);

