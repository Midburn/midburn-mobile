import _ from 'lodash';
import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';
import {getString, isRTL} from '../../utils/Strings';

import Tag from './../components/TagComponent';
import TagComponent from "./TagComponent";


function getTagColor(tag) {

  const lowerCaseTag = _.toLower(tag);
  switch(lowerCaseTag) {
    case 'adult':
    case 'adults':
      return '#ff4d4d';
    case 'english':
      return '#18dcff';
    case 'alcohol':
      return '#fffa65';
    case 'servesfoodordrinks':
    case 'physicallydisabled':
      return '#32ff7e';
     case 'kids':
      return '#ffcccc';
    case 'party':
      return '#cd84f1';
    default:
      return Colors.dark70;
  }
}

export class EventComponent extends Component {

  constructor(props) {
    super(props);
    this.title = getString(this.props.titleHeb, this.props.titleEn);
    this.description = getString(this.props.descriptionHeb, this.props.descriptionEn);
    this.address = getString(this.props.addressHeb, this.props.addressEn);
  }

  _renderHeader() {
    return (
      <Card.Section>
        <View flex right={isRTL()}>
          <Text style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}} text40 color={Colors.dark10}>
            {this.title}
          </Text>
        </View>
      </Card.Section>
    );
  }

  // _renderTags() {
  //   return (
  //     <View row marginT-8>
  //       {_.map([IMAGE_1, IMAEG_2, IMAEG_3], (tag, i) =>
  //         <View marginR-8 key={i}>
  //           <Image
  //             source={tag}
  //             style={{width: TAG_IMAGE_SIZE, height: TAG_IMAGE_SIZE}}
  //           />
  //         </View>
  //       )}
  //     </View>
  //   );
  // }

  _renderTag(text, index) {
    return (
      <Tag text={text} index={index} key={index}/>
    );
  }

  _renderTags() {
    return (
      <View row style={{flexWrap: 'wrap'}}>
        {_.map(this.props.tags, (tag, i) => this._renderTag(tag, i))}
      </View>
    );
  }

  _renderBody() {
    return (
      <Card.Section>
        <View flex column right={isRTL()}>
          <Text text90 color={Colors.dark10}>
            {this.description}
          </Text>
          {this._renderTags()}
        </View>
      </Card.Section>
    );
  }

  _renderFooter() {
    return (
      <Card.Section footer>
        <Card.Item>
          {/*<Text text90 color={this.props.color} style={{writingDirection: isRTL() ? 'rtl' : 'ltr'}}>*/}
            {/*{this.props.place + ' | '}*/}
          {/*</Text>*/}
          <Text text90 color={'black'}> {this.props.time}</Text>
        </Card.Item>
        <Card.Item>
          <Text style={{marginRight: 10}} text90>
            {this.address}
          </Text>
        </Card.Item>
      </Card.Section>
    );
  }

  render() {
    return (
      <Card key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section body>
          {this._renderHeader()}
          {this._renderBody()}
          {this._renderFooter()}
        </Card.Section>
      </Card>
    );
  }

  renderTag() {
    return (
      <View>
        <Text>Sound</Text>
      </View>
    );
  }
}

