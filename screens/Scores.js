'use strict';
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button} from 'react-native';
import Toolbar from '../components/Toolbar'

export default class Scores extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.fetchScores();
    }

    fetchScores = async () => {
        try {
            var scores = await AsyncStorage.getItem('scores');
            scores = JSON.parse(scores);
            console.log(scores)
        } catch (error) {
            // Error retrieving data
        }
    }

    backHandler = () => this.props.navigation.goBack();

    render() {
        return (
            <View style={styles.container}>
                <Toolbar back={true} backHandler={this.backHandler} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
});
