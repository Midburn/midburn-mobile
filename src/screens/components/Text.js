import React, {Component} from 'react';
import {Text as UILibText} from 'react-native-ui-lib';
import {isRTL} from "../../utils/Strings";


export class Text extends Component {

  render() {

    return (
        <UILibText style={[this.props.style, {writingDirection: isRTL() ? 'rtl' : 'ltr'}]} {...this.props}>
          {this.props.children}
        </UILibText>
    );
  }
}
