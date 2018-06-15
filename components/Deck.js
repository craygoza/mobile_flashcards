import React, { Component } from 'react'
import {View, Text, StyleSheet} from "react-native";
import { white } from "../utils/colors";
import DeckButton from "./DeckButton";

class Deck extends Component {
    render(){
       const { deck } = this.props

       return (
        <View style={styles.deck} >
            { deck &&
            <DeckButton styles={styles.deckButton} onPress={() => this.props.navigation.navigate('DeckView', { deckId: deck, handleOnNavigateBack:this.props.handleOnNavigateBack })}>
                <Text style={{fontSize: 18, color: white}}> {deck.item.title}</Text>
                <Text style={{fontSize: 11, color: white}}>Total of {deck.item.questions ? deck.item.questions.length : 0} cards</Text>
            </DeckButton>
            }
        </View>
       )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: 1,
        marginTop: 5
    },
    deckButton: { backgroundColor: white, padding:10, margin:0, flex: 1 }
})
export default Deck