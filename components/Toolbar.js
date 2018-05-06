'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, Platform, View } from 'react-native';
import CustomStatusBar from './CustomStatusBar'
import * as constants from '../constants';

export default class Toolbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            os: Platform.OS,
            dims: Dimensions.get('window')
        };
    }

    dimensionsHandler = () => {
        this.setState({dims: Dimensions.get('window')});
    }

    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionsHandler);
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.dimensionsHandler);
    }

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
        const isIphoneX = constants.isIphoneX(this.state.os, this.state.dims);
        return (
            <View style={styles.constainer}>
                <CustomStatusBar dims={this.state.dims} />
                <View style={[styles.bar, isIphoneX ? styles.isIphoneXBar : null]}>
                    {back ? this.backButton() : null}
                    <Text style={styles.title}>WikiRace</Text>
                    {settings ? this.settingsButton() : null}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
