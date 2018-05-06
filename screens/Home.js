'use strict';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import Toolbar from '../components/Toolbar'

export default class Home extends Component {
    render() {
      return (
        <View style={styles.container}>
            <Toolbar back={true} settings={true}/>
          <Text>Home</Text>
          <Button
            title='Play'
            onPress={() => this.props.navigation.navigate('Play')}
          />
          <Button
            title='Scores'
            onPress={() => this.props.navigation.navigate('Scores')}
          />
          <Button
            title='Settings'
            onPress={() => this.props.navigation.navigate('Settings')}
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
