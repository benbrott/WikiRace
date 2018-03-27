'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Button} from 'react-native';
import CustomStatusBar from '../CustomStatusBar'
import Toolbar from '../Toolbar'

export default class Play extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {
        this.getRandomPages();
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

    render() {
        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <CustomStatusBar />
                    <Toolbar />
                  <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <CustomStatusBar />
                <Toolbar />
                <Text>Play</Text>
                <Text>Start: {this.state.start.title}</Text>
                <Text>Goal: {this.state.goal.title}</Text>
                <Button
                    title="Random"
                    onPress={() => this.getRandomPages()}
                />
                <Button
                    title="Game"
                    onPress={() => this.props.navigation.navigate('Game', {
                        start: this.state.start,
                        goal: this.state.goal
                    })}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
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
