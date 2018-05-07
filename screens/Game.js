'use strict';
import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, NetInfo, Dimensions, Platform} from 'react-native';
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
            count: 0,
            dims: Dimensions.get('window')
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
                this.setState({
                    isLoading: false,
                    current: current,
                    links: updatedLinks
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    homeHandler = () => this.props.navigation.navigate('Home');

    scoresHandler = () => this.props.navigation.navigate('Scores');

    linkClicked = (current) => {
        if (current.title == this.state.goal.title) {
            console.log('WINNER!');
            this.props.navigation.navigate('Summary', {
                start: this.state.start,
                goal: this.state.goal,
                count: this.state.count + 1
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
                        <Text style={styles.link}>{link.title}</Text>
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
                </View>
            )
        }
      return (
          <View style={styles.container}>
            <Toolbar home={true} homeHandler={this.homeHandler} scores={true} scoresHandler={this.scoresHandler} />
            <ScrollView contentContainerStyle={[styles.contentContainer, constants.isIPhoneXLandscape(Platform.OS, this.state.dims) ? styles.landscapeContainer : null]}>
                {this.renderLinks()}
          </ScrollView>
          <View style={{flex: 1, bottom: 40, right: 40, width: 100, height: 100, zIndex: 1, position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
              <Text>{this.state.count}</Text>
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
    link: {
        fontSize: 14,
        color: 'white'
    },
});
