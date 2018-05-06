'use strict';
import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, StyleSheet, Text, View, Button} from 'react-native';
import * as constants from '../constants'
import Toolbar from '../components/Toolbar'

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

    backHandler = () => this.props.navigation.goBack();

    render() {
        if (this.state.isLoading) {
            return(
                <View style={styles.container}>
                <Toolbar back={true} backHandler={this.backHandler}/>
                  <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
            <Toolbar back={true} backHandler={this.backHandler} />
              <Text>{'random:' + this.state.random}</Text>
              <Button
                title='Switch'
                onPress={() => {
                    AsyncStorage.setItem('random', 'popular');
                    this.setState({random: this.state.random === 'popular' ? 'all' : 'popular'});
                }}
              />
              <Button
                title='Reset'
                onPress={() => {
                    for (var setting in constants.defaultSettings) {
                        AsyncStorage.setItem(setting, constants.defaultSettings[setting]);
                    }
                    this.setState({...constants.defaultSettings});
                }}
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
