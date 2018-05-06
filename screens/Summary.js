'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Toolbar from '../components/Toolbar'
import * as constants from '../constants'

export default class Summary extends Component {
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            start: params.start,
            goal: params.goal,
            count: params.count
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar />
                <Text>{this.state.start}</Text>
                <Text>{this.state.goal}</Text>
                <Text>{this.state.count}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});
