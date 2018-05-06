'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Platform, StatusBar, Dimensions} from 'react-native';
import * as constants from '../constants';

const MyStatusBar = ({backgroundColor, ...props}) => (
      <View style={[styles.statusBar, {backgroundColor}]}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
);

class CustomStatusBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const isLandscape = constants.isLandscape(this.props.dims);
        if (isLandscape) {
            return null;
        }
        return (
            <MyStatusBar backgroundColor={constants.COLOR_MAIN} barStyle='light-content'/>
        );
    }
}

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    statusBar: {
        height: statusBarHeight
    }
});

export default CustomStatusBar;
