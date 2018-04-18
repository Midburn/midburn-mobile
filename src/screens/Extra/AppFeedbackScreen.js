import _ from 'lodash';
import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import {isRTL} from './../../utils/Strings';


const principlesData = require('../../../data/2018/info/principles.json').principles;

const iconMap = {
  'radicalinclusion.png': require('../../../data/2018/images/info/radicalinclusion.png'),
  'communaleffort.png': require('../../../data/2018/images/info/communaleffort.png'),
  'gifting.png': require('../../../data/2018/images/info/gifting.png'),
  'civicresponsability.png': require('../../../data/2018/images/info/civicresponsability.png'),
  'decommodification.png': require('../../../data/2018/images/info/decommodification.png'),
  'leavingnotrace.png': require('../../../data/2018/images/info/leavingnotrace.png'),
  'radicalselfreliance.png': require('../../../data/2018/images/info/radicalselfreliance.png'),
  'participation.png': require('../../../data/2018/images/info/participation.png'),
  'radicalselfexpression.png': require('../../../data/2018/images/info/radicalselfexpression.png'),
  'immediacy.png': require('../../../data/2018/images/info/immediacy.png')
};

export default class AppFeedbackScreen extends Component {

  render() {
    return (
      <View flex>
        <ScrollView>
          {
            _.map(principlesData, (principle) => {
              return (
                <View padding-12 key={principle.name} right={isRTL()}>
                  <View center={isRTL()} centerH={!isRTL()} style={{flexDirection: isRTL() ? 'row-reverse' : 'row'}}>
                    <View paddingR-8={!isRTL()} paddingL-8={isRTL()}>
                      <Image
                        source={iconMap[principle.logo]}
                        style={{width: 40, height: 40,  marginLeft: -7}}
                      />
                    </View>
                    <Text text40>{isRTL() ? principle.name : principle.nameEn}</Text>
                  </View>
                  <Text text70 style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>{isRTL() ? principle.description : principle.descriptionEn}</Text>
                </View>
              );
            })
          }


        </ScrollView>
      </View>
    );
  }
}

