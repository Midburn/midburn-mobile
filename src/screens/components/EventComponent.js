import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getString, isRTL} from '../../utils/Strings';
import * as campsAndArtStore from '../../stores/campsAndArt/store';
import {getHourFromTime, getDayFromTime} from '../../utils/Time';
import Tags from './TagsComponent';


const ICON_TIME = require('../../../data/img/time.png');
const ICON_LOCATION = require('../../../data/img/mapB.png');
const ICON_CAMP = require('../../../data/img/camp.png');
const ICON_SIZE = 14;



export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
    this.tags = _.map(this.props.tags, (tagId) => {
      return campsAndArtStore.getters.getGiftTagTitleForId(tagId);
    });
    this.camp = getString(this.props.campHeb, this.props.campEn);
  }

  _renderTitle() {
    return (
      <Card.Section>
        <View flex right={isRTL()}>
          <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '600'}} text60 color={Colors.dark10}>
            {this.title}
          </Text>
        </View>
      </Card.Section>
    );
  }

  _renderDate() {
    const prefix = isRTL() ? 'יום ' : '';
    return (
      <Card.Section>
        <View flex right={isRTL()}>
          <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr', fontWeight: '600'}} text90 color={Colors.dark40}>
            {prefix + getDayFromTime(this.props.unixTime)}
          </Text>
        </View>
      </Card.Section>
    )
  }

  _renderTags() {
    return (
      <Tags tags={this.props.tags} context={'gifts'}/>
    );
  }

  _renderDetailRow(icon, text1, text2) {
    return (
      <View paddingT-6 style={{flexDirection: isRTL() ? 'row-reverse' : 'row', alignItems: 'center'}}>
        <Image
          style={{width: ICON_SIZE, height: ICON_SIZE}}
          source={icon}
        />
        <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr', paddingHorizontal: 8, fontWeight: '500'}} text80 color={Colors.dark10}>
          {text1}
        </Text>
      </View>
    );
  }

  _renderDetails() {
    return (
      <Card.Section>
        <View flex right={isRTL()} paddingT-4>
          {this._renderDetailRow(ICON_TIME, getHourFromTime(this.props.unixTime))}
          {this._renderDetailRow(ICON_CAMP, this.camp)}
          {this._renderDetailRow(ICON_LOCATION, `${this.address}`)}
        </View>

      </Card.Section>
    )
  }

  render() {
    return (
      <Card key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section body>
          {this._renderDate()}
          {this._renderTitle()}
          {this._renderDetails()}
          {this._renderTags()}
        </Card.Section>
      </Card>
    );
  }
}

