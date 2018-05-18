'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Toolbar from '../components/Toolbar'
import { NavigationActions } from 'react-navigation';
import * as constants from '../constants'

export default class Summary extends Component {
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            start: params.start,
            goal: params.goal,
            count: params.count,
            time: params.time,
        }
    }

    homeHandler = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Home' })]
        }));
    }

    replayHandler = () => {
        this.props.navigation.dispatch(NavigationActions.reset({
            index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Game', params: {
                start: this.state.start,
                goal: this.state.goal
            }})]
        }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar home={true} homeHandler={this.homeHandler} replay={true} replayHandler={this.replayHandler}/>
                <Text>{this.state.start.title}</Text>
                <Text>{this.state.goal.title}</Text>
                <Text>{this.state.count}</Text>
                <Text>{String(this.state.time)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});
