import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, KeyboardAvoidingView, DeviceEventEmitter} from "react-native";
import {lightgray, white} from "../utils/colors";
import * as StorageAPI from '../utils/StorageAPI'
import DecisionButton from "./DecisionButton";
import {DECK_LIST_REFRESH_KEY} from "../utils/udaciCardsConstants";

class AddDeck extends Component {
    state = { text: '' };

    save = () => {
        let deckId = {
            item: {}
        }

        StorageAPI.saveDeckTitle(this.state.text).then((deck) => {
            StorageAPI.getDeck(this.state.text).then((data) => {
                deckId.item = data;

                DeviceEventEmitter.emit(DECK_LIST_REFRESH_KEY, {})
                this.props.navigation.navigate('DeckView', { deckId:deckId })
            })
        })
    }

    render() {
         return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.maintext}> What is the title of your new deck?</Text>
                <TextInput style={styles.input}  ref="textInput" onChangeText={(text) => this.setState({text})}
                           value={this.state.text}></TextInput>

                <DecisionButton type={'incorrect'} onPress={this.save}>
                    <Text style={{fontSize: 18, color: white}}> Submit</Text>
                </DecisionButton>
            </KeyboardAvoidingView>
         )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        margin: 8,
        backgroundColor: lightgray,
        borderRadius: 12,
        alignSelf: 'stretch',
        height:400
    },
    input: {
        width: 200,
        backgroundColor:white,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 50
    },
    maintext: {
        color: white,
        fontSize: 40,
        marginTop: 10,
        textAlign: 'center'

    }
})


export default AddDeck