import _ from 'lodash';
import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import {isRTL} from './../../utils/Strings';


const safetyData = require('../../../data/2018/info/safety.json');

export default class SafetyScreen extends Component {

  render() {
    return (
      <View flex useSafeArea>
        <ScrollView>
          {
            _.map(safetyData, (obj) => {
              return (
                <View padding-12 key={obj.name} right={isRTL()}>
                  <View center={isRTL()} centerH={!isRTL()} style={{flexDirection: isRTL() ? 'row-reverse' : 'row'}}>
                    <Text text40 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{isRTL() ? obj.name : obj.nameEn}</Text>
                  </View>
                  <Text text70 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{isRTL() ? obj.description : obj.descriptionEn}</Text>
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

