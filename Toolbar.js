'use strict';
import React, { Component } from 'react';
import { StyleSheet, Text, Platform, View } from 'react-native';
import * as constants from './constants';

class Toolbar extends Component {

    settingsButton = () => {
        return(
            <Text style={styles.title}>S</Text>
        );
    }

    backButton = () => {
        return(
            <Text style={styles.title}>B</Text>
        );
    }

    render() {
        const {back, settings} = this.props;
        return (
            <View style={styles.bar}>
                {back ? this.backButton() : null}
                <Text style={styles.title}>WikiRace</Text>
                {settings ? this.settingsButton() : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: constants.COLOR_MAIN,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
        fontSize: 18
    }
});

export default Toolbar;
