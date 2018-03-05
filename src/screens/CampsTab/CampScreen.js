import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, Button} from 'react-native-ui-lib';


export default class MapTab extends Component {
  render() {
    return (
      <ScrollView style={{backgroundColor: '#F2F4F5'}}>
        <View flex>
          <View margin-30>
            {/* <Text style={{marginBottom: 10}} text30>{this.props.data.name_en}</Text> */}
            <Text text70>{this.props.data.desc_en}</Text>
          </View>

          <View margin-30>
            <Text text80 margin-5>{'Full name: ' + this.props.data.fullName}</Text>
            <Text text80 margin-5>{'Phone: ' + this.props.data.phone}</Text>
            <Text text80 margin-5>{'Email: ' + this.props.data.email}</Text>
            <Text text80 margin-5>{'Facebook url: ' + this.props.data.facebook_page_url}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
