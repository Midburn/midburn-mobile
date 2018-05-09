import React, {Component} from 'react';
import {Colors, TextInput} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';


export default class SearchBar extends Component {



  render() {
    return (
        <TextInput
          hideUnderline
          text80
          ref={(ref) => this.props.textInputRef(ref)}
          autoCorrect={false}
          style={{textAlign: isRTL() ? 'right': 'left', fontSize: 16, fontWeight: '500'}}
          onChangeText={this.props.onChangeText}
          value={this.props.text}
          placeholder={this.props.placeholder}
          clearButtonMode={'while-editing'}
        />
    );
  }
}
