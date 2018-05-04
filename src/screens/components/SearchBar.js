import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Button, Colors, TextInput} from 'react-native-ui-lib';
import {isRTL} from '../../utils/Strings';


export default class SearchBar extends Component {


// <SerachBar
// onChangeText={this.onTextChanged}
// value={this.state.text}
// placeholder={PLACEHOLDER_SEARCH_INPUT}
// ref={(ref) => this.searchTextInputRef = ref}
// />

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
