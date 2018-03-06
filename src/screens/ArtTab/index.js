import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';


export default class ArtTab extends Component {
  constructor(props) {
    super(props);
    this.state = {isHidden: false};
  }
  showHiddenText() {
    this.setState({isHidden: !this.state.isHidden})
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ART TAB
        </Text>
        <Image style={{
          width: 300,
          height: 300,
          borderWidth: 0.5,
          borderColor: 'black'
        }}>
        </Image>
        <Text style={styles.welcome}>
          Flaming Unicorn
        </Text>
        <Text style={styles.welcome}>
          Flaming Unicorn is All about YOU! Why? Because HELLO!! We Love you!
        </Text>
        {this.state.isHidden ? <Text hide={true} style={styles.welcome}>Hey Hey, behold INVISIBLE PINK UNICORN camp, this year we want to give our love to (behold!) INVISIBLE PINK UNICORN through our love</Text> : undefined}
        <Button onPress={() => this.showHiddenText()} title={'show me special hidden info'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
