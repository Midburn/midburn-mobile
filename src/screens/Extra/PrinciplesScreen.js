import _ from 'lodash';
import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';

const principlesData = require('../../../data/burning-man/principles.json').principles;

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
}
export default class PrinciplesScreen extends Component {

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          _.map(principlesData, (principle) => {
            return (
              <View padding-8 key={principle.name} >
                <View style={styles.principleLogoAndTitleContainer}>
                  <Image
                    source={iconMap[principle.logo]}
                    style={styles.principleLogo}
                  />
                  <Text text40>{principle.name}</Text>
                </View>
                <Text text70 style={styles.principleDescription}>{principle.description}</Text>
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
  principleDescription: {
    // paddingLeft: 48
  }
});
