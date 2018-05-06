'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button, NetInfo} from 'react-native';
import Toolbar from '../components/Toolbar'
import Disconnected from './Disconnected'
import * as constants from '../constants'

export default class Play extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading: true};
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                isConnected: isConnected,
            });
            if (isConnected) {
                this.getRandomPages()
            }
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.onConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.onConnectivityChange);
    }

    onConnectivityChange = isConnected => {
        if (isConnected && this.state.isLoading) {
            this.getRandomPages()
        }
        this.setState({isConnected: isConnected});
    }

    getRandomPages = () => {
        const url = 'https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=2&rnnamespace=0&format=json'
        fetch(url).then(response => response.json()).then(response => {
            this.setState({
                isLoading: false,
                start: response.query.random[0],
                goal: response.query.random[1]
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    settingsHandler = () => this.props.navigation.navigate('Settings');

    backHandler = () => this.props.navigation.goBack();

    render() {
        if (!this.state.isConnected) {
            return(
                <Disconnected />
            );
        }
        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <Toolbar back={true} backHandler={this.backHandler} settings={true} settingsHandler={this.settingsHandler}/>
                  <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Toolbar back={true} backHandler={this.backHandler} settings={true} settingsHandler={this.settingsHandler} />
                <Text>Play</Text>
                <Text>Start: {this.state.start.title}</Text>
                <Text>Goal: {this.state.goal.title}</Text>
                <Button
                    title='Random'
                    onPress={() => this.getRandomPages()}
                />
                <Button
                    title='Game'
                    onPress={() => this.props.navigation.navigate('Game', {
                        start: this.state.start,
                        goal: this.state.goal
                    })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
});
