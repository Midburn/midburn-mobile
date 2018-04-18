import _ from 'lodash';
import React, {Component} from 'react';
import {Text, View, Button, Colors, TextInput} from 'react-native-ui-lib';


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
          bg-red10
          ref={(ref) => this.props.textInputRef(ref)}
          autoCorrect={false}
          style={{textAlign: 'left', fontSize: 15,}}
          onChangeText={this.props.onChangeText}
          value={this.props.text}
          placeholder={this.props.placeholder}
        />
    );
  }
}
