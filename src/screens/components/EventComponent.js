import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getString, isRTL} from '../../utils/Strings';
import * as giftsStore from '../../stores/gifts/store';
import {getHourFromTime, getDayFromTime} from '../../utils/Time';
import Tags from './TagsComponent';
import {DetailsComponent} from './DetailsComponent';



export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
    this.tags = _.map(this.props.tags, (tagId) => {
      return giftsStore.getters.getGiftTagTitleForId(tagId);
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
      <Tags
        tags={this.props.tags}
        context={'gifts'}
        filteredDesign={this.props.filteredDesign}
      />
    );
  }


  _renderDetails() {
    return (
      <Card.Section>

        <DetailsComponent
          details={[
            {icon: 'TIME', text: getHourFromTime(this.props.unixTime)},
            {icon: 'CAMP', text: this.camp},
            {icon: 'LOCATION', text: this.address},
          ]}
        />
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

