'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';

export default class Game extends Component {
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            isLoading: true,
            start: params.start,
            current: params.start,
            goal: {title: '2 Chainz'},//params.goal,
            count: 0
        }
        this.linkClicked({title: 'Kanye West'});//params.start
    }

    updateLinks = (current, links, plcontinue) => {
        const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=links&plnamespace=0&pllimit=max&format=json&titles=' + current.title.replace(' ', '+') + (plcontinue ? '&plcontinue=' + plcontinue : '');
        fetch(url).then(response => response.json()).then(response => {
            const updatedLinks = links.concat(response.query.pages[Object.keys(response.query.pages)[0]].links);
            if (response.continue) {
                this.updateLinks(current, updatedLinks, response.continue.plcontinue);
            }
            else {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    current: current,
                    links: updatedLinks
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    linkClicked = (current) => {
        if (current.title == this.state.goal.title) {
            console.log('WINNER!');
        }
        let links = [];
        this.updateLinks(current, links, null);
    }

    renderLinks = (state) => {
        return this.state.links.map( (link, i) => {
            return(
                <TouchableOpacity onPress={() => {
                    this.setState({
                        ...this.state,
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
        if(this.state.isLoading) {
            return(
                <View style={styles.container}>
                  <ActivityIndicator/>
                </View>
            )
        }
      return (
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
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
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 5
    },
    card: {
        backgroundColor: '#758449',
        padding: 10,
        margin: 3,
        borderRadius: 10
    },
    link: {
        fontSize: 14,
        color: '#ffffff'
    }
});