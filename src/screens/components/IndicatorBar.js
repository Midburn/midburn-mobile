import _ from 'lodash';
import React, {Component} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';
import {tagToImg} from '../../../data/img'


export default class IndicatorBar extends Component {

  _onPress(i) {
    this.props.onChangeIndex(i);

  }


  render() {
    const selectedIndex = this.props.selectedIndex;
    return (
      <View row spread style={{...this.props.containerStyle}}>
        {_.map(this.props.items, (item, i) => {
          const backgroundColor = selectedIndex === i ? 'black' : 'transparent';
          return (
            <View flex margin-1 center key={i}>
              <Button borderRadius={0} onPress={() => this._onPress(i)} style={{backgroundColor , flex: 1}} avoidInnerPadding avoidMinWidth>
                <View flex centerH>
                  <Image
                    source={tagToImg(item)}
                    style={{width: 30, height: 30}}
                  />
                  <Text>

                  </Text>
                </View>
              </Button>
            </View>
          );
        })}

      </View>
    );
  }
}
