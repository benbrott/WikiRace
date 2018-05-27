'use strict';
import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, NetInfo, Dimensions, Platform} from 'react-native';
import Toolbar from '../components/Toolbar'
import Loading from '../components/Loading'
import Disconnected from './Disconnected'
import * as constants from '../constants'

export default class Game extends Component {
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            isLoading: true,
            start: params.start,
            current: params.start,
            goal: params.goal,
            path: [params.start],
            count: 0,
            dims: Dimensions.get('window'),
            os: Platform.OS
        }
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                isConnected: isConnected,
            });
        }).catch(error => {
            console.log(error);
        });
    }

    dimensionsHandler = () => {
        this.setState({dims: Dimensions.get('window')});
    }

    componentWillMount() {
        Dimensions.addEventListener('change', this.dimensionsHandler);
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.onConnectivityChange);
        this.linkClicked(this.state.current);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.onConnectivityChange);
        Dimensions.removeEventListener('change', this.dimensionsHandler);
    }

    onConnectivityChange = isConnected => {
        this.setState({isConnected: isConnected});
    }

    updateLinks = (current, links, plcontinue) => {
        const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=links&plnamespace=0&pllimit=max&format=json&titles=' + current.title.split(' ').join('+').split('&').join('%26') + (plcontinue ? '&plcontinue=' + plcontinue : '');
        fetch(url).then(response => response.json()).then(response => {
            const updatedLinks = links.concat(response.query.pages[Object.keys(response.query.pages)[0]].links);
            if (response.continue) {
                this.updateLinks(current, updatedLinks, response.continue.plcontinue);
            }
            else {
                if (this.state.startTime) {
                    var path = this.state.path;
                    path.push(current)
                    this.setState({
                        isLoading: false,
                        current: current,
                        links: updatedLinks,
                        path: path
                    });
                }
                else {
                    this.setState({
                        isLoading: false,
                        current: current,
                        links: updatedLinks,
                        startTime: Date.now()
                    });
                }

            }
        }).catch((error) => {
            console.error(error);
        });
    }

    homeHandler = () => {
        Alert.alert(
            'Are you sure you want to quit?',
            'Progress will not be saved',
            [
                {text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel'},
                {text: 'Quit', onPress: () => this.props.navigation.navigate('Home'), style: 'destructive'}
            ],
            { cancelable: false }
        );
    }

    scoresHandler = () => this.props.navigation.navigate('Scores');

    linkClicked = (current) => {
        if (current.title == this.state.goal.title) {
            console.log('WINNER!');
            var path = this.state.path;
            path.push(current)
            this.props.navigation.navigate('Summary', {
                start: this.state.start,
                goal: this.state.goal,
                count: this.state.count + 1,
                time: Date.now() - this.state.startTime,
                path: path
            });
        }
        else {
            let links = [];
            this.updateLinks(current, links, null);
        }
    }

    renderLinks = (state) => {
        return this.state.links.map( (link, i) => {
            return(
                <TouchableOpacity onPress={() => {
                    this.setState({
                        isLoading: true,
                        count: this.state.count + 1
                    });
                    this.linkClicked(link);
                }} style={styles.card} key={i}>
                        <Text style={styles.whiteText}>{link.title}</Text>
                </TouchableOpacity>
            );
      });
    }

    render() {
        if (!this.state.isConnected) {
            return(
                <Disconnected />
            );
        }
        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                    <Toolbar home={true} homeHandler={this.homeHandler} scores={true} scoresHandler={this.scoresHandler} />
                    <Loading />
                    <View style={[styles.bar, constants.isIPhoneX(this.state.os, this.state.dims) ? styles.barExtraPadding : null]}>
                        <Text style={styles.whiteText}>Goal: {this.state.goal.title}</Text>
                        <Text style={styles.whiteText}>{this.state.count}</Text>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Toolbar home={true} homeHandler={this.homeHandler} scores={true} scoresHandler={this.scoresHandler} />
                <ScrollView contentContainerStyle={[styles.contentContainer, constants.isIPhoneXLandscape(this.state.os, this.state.dims) ? styles.landscapeContainer : null]}>
                {this.renderLinks()}
                </ScrollView>
                <View style={[styles.bar, constants.isIPhoneX(this.state.os, this.state.dims) ? styles.barExtraPadding : null]}>
                    <Text style={styles.whiteText}>Goal: {this.state.goal.title}</Text>
                    <Text style={styles.whiteText}>{this.state.count}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    landscapeContainer: {
        paddingHorizontal: constants.IPHONEX_PADDING,
    },
    card: {
        backgroundColor: constants.COLOR_SECONDARY,
        padding: 10,
        margin: 3,
        borderRadius: 10
    },
    whiteText: {
        fontSize: 14,
        color: 'white'
    },
    bar: {
        backgroundColor: constants.COLOR_MAIN,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    barExtraPadding: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
});
