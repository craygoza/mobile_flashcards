import React, { Component } from 'react'
import * as StorageAPI from "../utils/StorageAPI";
import Deck from "./Deck";
import { View, StyleSheet, FlatList, DeviceEventEmitter } from "react-native";
import {DECK_LIST_REFRESH_KEY} from "../utils/udaciCardsConstants";

class DeckList extends Component {
    state = {
        decks: {},
    }

    componentDidMount(){
        DeviceEventEmitter.addListener(DECK_LIST_REFRESH_KEY, this.loadData)

        this.loadData();
    }

    loadData = () => {
        StorageAPI.getDecks().then(data => {
            if (data) {
                this.setState(() => ({decks: JSON.parse(data)}))
            }
        })
    }

    renderItem = deck => {
        return <Deck deck={deck} key={deck.title} navigation={this.props.navigation} handleOnNavigateBack={this.handleOnNavigateBack} />
    }

    render() {
        const decksArray = this.state.decks && Object.keys(this.state.decks).map( key => this.state.decks[key])

        return (
            <View>
                <FlatList data={decksArray} renderItem={this.renderItem} keyExtractor={(item) => item.title} />
            </View>
        )
    }
}

export default DeckList