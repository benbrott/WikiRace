'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Toolbar from '../components/Toolbar'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    settingsHandler = () => this.props.navigation.navigate('Settings');

    scoresHandler = () => this.props.navigation.navigate('Scores');

    render() {
      return (
        <View style={styles.container}>
            <Toolbar scores={true} scoresHandler={this.scoresHandler} settings={true} settingsHandler={this.settingsHandler} />
          <Text>Home</Text>
          <Button
            title='Play'
            onPress={() => this.props.navigation.navigate('Play')}
          />
        </View>
      );
    }
}
const styles = StyleSheet.create({
  container: {
      flex: 1
  },
});
