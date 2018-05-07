'use strict';
import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View, Button, Switch, Dimensions, Platform} from 'react-native';
import * as constants from '../constants'
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'

export default class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dims: Dimensions.get('window')
        };
        this.fetchSettings();
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

    fetchSettings = async () => {
        try {
            const random = await AsyncStorage.getItem('random');
            this.setState({
                isLoading: false,
                random: random
            });
        } catch (error) {
            // Error retrieving data
        }
    }

    backHandler = () => this.props.navigation.goBack();

    randomSwitchHandler = (value) => {
        console.log(value)
        if (value) {
            AsyncStorage.setItem('random', 'popular');
            this.setState({random: 'popular'});
        }
        else {
            AsyncStorage.setItem('random', 'all');
            this.setState({random: 'all'});
        }
    }

    render() {
        if (this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <Toolbar back={true} backHandler={this.backHandler}/>
                    <Loading />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Toolbar back={true} backHandler={this.backHandler} />
                <View style={[styles.settingContainer, constants.isIPhoneXLandscape(Platform.OS, this.state.dims) ? styles.extraPadding : null]}>
                    <Text>popular pages only</Text>
                    <Switch onValueChange={this.randomSwitchHandler} value={this.state.random === 'popular'} />
                </View>
                <Button
                    title='Reset'
                    onPress={() => {
                        for (var setting in constants.DEFAULT_SETTINGS) {
                            AsyncStorage.setItem(setting, constants.defaultSettings[setting]);
                        }
                        this.setState({...constants.defaultSettings});
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  settingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
  },
  extraPadding: {
      paddingHorizontal: constants.IPHONEX_PADDING
  }
});
