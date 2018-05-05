'use strict';
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button} from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar'
import Toolbar from '../components/Toolbar'

export default class Scores extends Component {
    constructor(props){
        super(props);
        this.state = {};
        this.fetchData();
    }

    fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            console.log(value);
            if (value != null) {
                this.setState({'name': value})
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
      return (
        <View style={styles.container}>
            <CustomStatusBar />
            <Toolbar />
          <Text>{this.state.name != null ? this.state.name : 'NULL'}</Text>
          <Button
            title='Go back'
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
