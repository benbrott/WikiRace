'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import * as constants from '../constants'

export default class Loading extends Component {
    render() {
      return (
          <View style={styles.container}>
            <ActivityIndicator />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});
