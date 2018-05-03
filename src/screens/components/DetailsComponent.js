import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';
const ICON_SIZE = 14;

const ICONS = {
  TIME: require('../../../data/img/time.png'),
  LOCATION: require('../../../data/img/mapB.png'),
  CAMP:require('../../../data/img/camp.png'),
};

export class DetailsComponent extends Component {

  _renderDetailRow({icon, text}, index) {
    return (
      <View key={index} paddingT-6 style={{flexDirection: isRTL() ? 'row-reverse' : 'row', alignItems: 'center'}}>
        <Image
          style={{width: ICON_SIZE, height: ICON_SIZE}}
          source={ICONS[icon]}
        />
        <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr', paddingHorizontal: 8, fontWeight: '500'}} text80 color={Colors.dark10}>
          {text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <Card.Section>
        <View flex right={isRTL()} paddingT-4>
          {
            _.map(this.props.details, (obj, i) => {
              return this._renderDetailRow(obj, i);
            })
          }
        </View>

      </Card.Section>
    )
  }
}

