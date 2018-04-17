import _ from 'lodash';
import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import {isRTL} from './../../utils/Strings';


const principlesData = require('../../../data/2018/principles.json').principles;

const iconMap = {
  'radicalinclusion.png': require('../../../data/img/radicalinclusion.png'),
  'communaleffort.png': require('../../../data/img/communaleffort.png'),
  'gifting.png': require('../../../data/img/gifting.png'),
  'civicresponsability.png': require('../../../data/img/civicresponsability.png'),
  'decommodification.png': require('../../../data/img/decommodification.png'),
  'leavingnotrace.png': require('../../../data/img/leavingnotrace.png'),
  'radicalselfreliance.png': require('../../../data/img/radicalselfreliance.png'),
  'participation.png': require('../../../data/img/participation.png'),
  'radicalselfexpression.png': require('../../../data/img/radicalselfexpression.png'),
  'immediacy.png': require('../../../data/img/immediacy.png')
};

export default class PrinciplesScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          _.map(principlesData, (principle) => {
            return (
              <View padding-8 key={principle.name} right={isRTL()}>
                <View center={isRTL()} centerH={!isRTL()} style={{flexDirection: isRTL() ? 'row-reverse' : 'row'}}>
                  <View paddingR-8={!isRTL()} paddingL-8={isRTL()}>
                    <Image
                      source={iconMap[principle.logo]}
                      style={styles.principleLogo}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  principleLogoAndTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  principleLogo: {
    width: 40,
    height: 40,
    marginLeft: -7
  },
});
