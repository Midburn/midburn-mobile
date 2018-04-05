import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';

const DOWN_ARROW = require('./../../../data/img/down.png');
const UP_ARROW = require('./../../../data/img/up.png');

export class EventComponent extends Component {
  render() {
    return (
      <Card key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section body>
          <Card.Section>
            <Text text50 color={Colors.dark10}>
              {this.props.titleEn}
            </Text>
          </Card.Section>
          <Card.Section>
            <View column>
              <Text text90 color={Colors.dark10}>
                {this.props.descriptionEn}
              </Text>
            </View>
          </Card.Section>
          <Card.Section footer>
            <Card.Item>
              <Text text90 color={this.props.color}>
                {this.props.place + ' | '}
              </Text>
              <Text text90 color={'black'}> {this.props.time}</Text>
            </Card.Item>
            <Card.Item>
              <Text style={{marginRight: 10}} text90>
                {this.props.address}
              </Text>
            </Card.Item>
          </Card.Section>
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
