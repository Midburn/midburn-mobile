import React, {Component} from 'react';
import {Text, Card, Colors, Button, View, Image} from 'react-native-ui-lib';

const DOWN_ARROW = require('./../../../data/img/down.png');
const UP_ARROW = require('./../../../data/img/up.png');

export class EventComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  render() {
    return (
      <Card onPress={this.expandCardPressed.bind(this)} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section body>
          <Card.Section>
            <Text text50 color={Colors.dark10}>
              {this.props.title}
            </Text>
          </Card.Section>
          <Card.Section>
            <View column>
              <Text text90 color={Colors.dark10} style={{height: this.state.expanded ? undefined : 35}}>
                {this.props.description}
              </Text>
              <View center>
                <Image style={{width: 30, height: 30}} source={this.state.expanded ? UP_ARROW : DOWN_ARROW}/>
              </View>
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

  expandCardPressed() {
    this.setState({expanded: !this.state.expanded});
  }
}
