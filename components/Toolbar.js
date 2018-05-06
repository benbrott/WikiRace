'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, Platform, View } from 'react-native';
import * as constants from '../constants';

export default class Toolbar extends Component {

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
        const isIphoneX = constants.isIphoneX(Platform.OS, Dimensions.get('window'));
        return (
            <View style={[styles.bar, isIphoneX ? styles.isIphoneXBar : null]}>
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
    isIphoneXBar: {
        paddingTop: 30
    },
    title: {
        color: 'white',
        fontSize: 18
    }
});