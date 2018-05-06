'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, Platform, View, TouchableOpacity, Image } from 'react-native';
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
            <TouchableOpacity onPress={() => this.props.settingsHandler()}>
                <Image source={require('../images/settings.png')} resizeMode='contain' style={styles.button}/>
            </TouchableOpacity>
        );
    }

    homeButton = () => {
        return(
            <TouchableOpacity onPress={() => this.props.homeHandler()}>
                <Image source={require('../images/home.png')} resizeMode='contain' style={styles.button}/>
            </TouchableOpacity>
        );
    }

    scoresButton = () => {
        return(
            <TouchableOpacity onPress={() => this.props.scoresHandler()}>
                <Image source={require('../images/scores.png')} resizeMode='contain' style={styles.button}/>
            </TouchableOpacity>
        );
    }

    backButton = () => {
        return(
            <TouchableOpacity onPress={() => this.props.backHandler()}>
                <Image source={require('../images/back.png')} resizeMode='contain' style={styles.button}/>
            </TouchableOpacity>
        );
    }

    replayButton = () => {
        return(
            <TouchableOpacity onPress={() => this.props.replayHandler()}>
                <Image source={require('../images/replay.png')} resizeMode='contain' style={styles.button}/>
            </TouchableOpacity>
        );
    }

    render() {
        const {back, settings, scores, home, replay} = this.props;
        const isIPhoneX = constants.isIPhoneX(this.state.os, this.state.dims);
        const isIPhoneXLandscape = constants.isIPhoneXLandscape(this.state.os, this.state.dims);
        return (
            <View style={styles.constainer}>
                <CustomStatusBar dims={this.state.dims} />
                <View style={[styles.bar, isIPhoneX ? styles.iPhoneXBar : null]}>
                    <View style={[styles.leftBar, isIPhoneXLandscape ? styles.extraPadding : null]}>
                        {home ? this.homeButton() : null}
                        {back ? this.backButton() : null}
                        {!back && !home && scores ? this.scoresButton() : null}
                    </View>
                    <View style={styles.centerBar}>
                        <Text style={styles.title}>WikiRace</Text>
                    </View>
                    <View style={[styles.rightBar, isIPhoneXLandscape ? styles.extraPadding : null]}>
                        {settings ? this.settingsButton() : null}
                        {replay ? this.replayButton() : null}
                        {(back || home) && scores ? this.scoresButton() : null}
                    </View>
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
        paddingVertical: 10,
        backgroundColor: constants.COLOR_MAIN,
        alignItems: 'center',
    },
    leftBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    centerBar: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightBar:  {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    extraPadding: {
        paddingHorizontal: 20
    },
    iPhoneXBar: {
        paddingTop: 30
    },
    title: {
        color: 'white',
        fontSize: 18
    },
    button: {
        height: constants.BUTTON_HEIGHT,
        aspectRatio: 1
    },
});
