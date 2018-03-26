'use strict';
import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, StyleSheet, Text, View, Button} from 'react-native';
import * as constants from '../constants'

export default class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading: true}
        this.fetchSettings();
    }

    fetchSettings = async () => {
        try {
            const random = await AsyncStorage.getItem('random');
            this.setState({
                isLoading: false,
                random: random
            });
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        if (this.state.isLoading) {
            return(
                <View style={styles.container}>
                  <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
              <Text>{'random:' + this.state.random}</Text>
              <Button
                title="Switch"
                onPress={() => {
                    AsyncStorage.setItem('random', 'popular');
                    this.setState({
                        ...this.state,
                        random: this.state.random === 'popular' ? 'all' : 'popular'
                    });
                }}
              />
              <Button
                title="Reset"
                onPress={() => {
                    for (var setting in constants.defaultSettings) {
                        AsyncStorage.setItem(setting, constants.defaultSettings[setting]);
                    }
                    this.setState({
                        ...this.state,
                        ...constants.defaultSettings
                    });
                }}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
});