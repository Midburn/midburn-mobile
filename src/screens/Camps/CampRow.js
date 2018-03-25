import _ from 'lodash';
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {Text, View, Card} from 'react-native-ui-lib';
import {getRandomImagesArray} from '../../../data/img';

export default class CampsTab extends PureComponent {

  constructor(props) {
    super(props);
    this.icons = getRandomImagesArray();
  }


  _onPress = () => {
    this.props.onPress(this.props.data);
  }

  _renderSidePanel() {
    return (
      <View>
        {_.map(this.icons, (src, key) => {
          return (
            <Image key={key} source={src} style={{width: 30, height: 30, margin: 4}} />
          );
        })}

      </View>
    );
  }

  _renderContent() {
    return (
      <View flex center>
        <Text text60 margin-19>{this.props.title}</Text>
      </View>
    );
  }

  // render() {
  //   return (
  //     <View flex bg-dark70 margin-16 marginH-0 marginB-0 paddingV-8 style={{borderRadius: 3}}>
  //       <TouchableOpacity onPress={this._onPress} style={{flex: 1}}>
  //         <View row left flex>
  //           {/* {this._renderSidePanel()} */}
  //           {this._renderContent()}
  //         </View>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  render() {
    return (
      <Card onPress={this._onPress} key={this.props.index} containerStyle={{marginBottom: 15}}>
        <Card.Section style={{alignItems: 'center'}} body>
          <Text text50>{this.props.title}</Text>
        </Card.Section>
      </Card>
    );
  }
}
