'use strict';
import React, { Component } from 'react';
import { AsyncStorage, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './screens/Home'
import Play from './screens/Play'
import Game from './screens/Game'
import Scores from './screens/Scores'
import Settings from './screens/Settings'
import Summary from './screens/Summary'
import * as constants from './constants'

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Play: {
      screen: Play,
    },
    Game: {
      screen: Game,
    },
    Scores: {
      screen: Scores,
    },
    Settings: {
      screen: Settings,
    },
    Summary: {
      screen: Summary,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        gesturesEnabled: false,
    }
  }
);

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.fetchSettings();
    }

    fetchSettings = async () => {
        try {
            const random = await AsyncStorage.getItem('random');
            if (random === null) {
                for (var setting in constants.defaultSettings) {
                    await AsyncStorage.setItem(setting, constants.defaultSettings[setting]);
                }
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    render() {
        return <RootStack />;
    }
}
