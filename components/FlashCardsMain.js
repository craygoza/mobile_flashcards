import React, { Component } from 'react'
import DeckList from "./DeckList";
import {StyleSheet, Text, View} from "react-native";
import DeckButton from "./DeckButton";

class FlashCardsMain extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <DeckList navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
});

export default FlashCardsMain