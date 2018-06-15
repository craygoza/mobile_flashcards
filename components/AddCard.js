import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, KeyboardAvoidingView, DeviceEventEmitter} from "react-native";
import {lightgray, white} from "../utils/colors";
import * as StorageAPI from '../utils/StorageAPI'
import DecisionButton from "./DecisionButton";
import {DECK_LIST_REFRESH_KEY} from "../utils/udaciCardsConstants";

class AddCard extends Component {
    state = { question: '',
              answer:'',
              correctAnswer:'',
          };

    save = () => {
        const { deckId } = this.props.navigation.state.params

        StorageAPI.addCardToDeck(deckId.item.title, newCard(this.state.question, this.state.answer, this.state.correctAnswer)).then( (card) => {
            StorageAPI.getDeck(deckId.item.title).then((data) => {
                deckId.item = data;

                DeviceEventEmitter.emit(DECK_LIST_REFRESH_KEY, {})
                this.props.navigation.navigate('DeckView', { deckId:deckId })
            })

        } )
    }

    render() {
         return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.maintext}> Question?</Text>
                <TextInput style={[styles.input, styles.textInputLocation]}  ref="inputQuestion" onChangeText={(question) => this.setState({question})}
                           value={this.state.text} />

                <Text style={[styles.maintext, styles.answerLocation]} > Answer?</Text>
                <TextInput style={[styles.input, styles.textInputLocation]}   ref="inputAnswer" onChangeText={(answer) => this.setState({answer})}
                           value={this.state.text} />

                <Text style={styles.maintext} > Correct Answer?</Text>
                <Text style={styles.smalltext} > Please type Correct or Incorrect </Text>
                <TextInput style={[styles.input, styles.textInputLocation]}  ref="inputCorrectAnswer" onChangeText={(correctAnswer) => this.setState({correctAnswer})}
                           value={this.state.text} />

                <DecisionButton type={'incorrect'} onPress={this.save}>
                    <Text style={{fontSize: 18, color: white}}> Submit</Text>
                </DecisionButton>
            </KeyboardAvoidingView>
         )
    }
}

const newCard = (question, answer, correstAnswer) => {
    return {
        question: question,
        answer: answer,
        correctAnswer: correstAnswer
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
        height:540
    },
    input: {
        width: 300,
        backgroundColor:white,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: '#757575',
        margin: 50
    },
    textInputLocation:{
      marginTop:10,
    },
    maintext: {
        color: white,
        fontSize: 30,
        marginTop: 5,
        textAlign: 'center'

    },
    smalltext: {
        color: white,
        fontSize: 11,
        marginTop: 1,
        textAlign: 'center'

    }
})

export default AddCard