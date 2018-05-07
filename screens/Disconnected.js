'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as constants from '../constants'
import Toolbar from '../components/Toolbar'

export default class Disconnected extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Toolbar />
                <View style={styles.connectionContainer}>
                    <Text style={styles.connectionText}>Unable to connect. Please check your network settings.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    connectionContainer: {
          flex: 1,
          backgroundColor: constants.COLOR_MAIN,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30
  },
  connectionText: {
      color: 'white',
      fontSize: 24
  }
});
