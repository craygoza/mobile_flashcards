import React, { Component } from 'react'
import {View, Text, StyleSheet} from "react-native";
import {gray, red, white} from "../utils/colors";
import DecisionButton from "./DecisionButton";
import * as StorageAPI from '../utils/StorageAPI'

class Summary extends Component {
    render(){
        const { correctedAnswered, totalQuestions } = this.props
        const incorrectAnswered = totalQuestions - correctedAnswered;
        const percentage =  (correctedAnswered / totalQuestions) * 100;
        const { deckId } = this.props.navigation.state.params

        StorageAPI.clearNotification()
            .then(StorageAPI.setNotification())

        return (
            <View style={styles.container} >
               <View style={styles.textContainer}>
                    <Text style={[styles.correctColorText, styles.normaltext]}>Correct answered questions: {correctedAnswered} </Text>
                    <Text style={[styles.incorrectColorText, styles.normaltext]}>Incorrect answered questions: {incorrectAnswered} </Text>
                    <Text>Percentage: {percentage}% </Text>
               </View>
                <View style={styles.buttonContainer}>
                    <DecisionButton type={'correct'} onPress={this.props.resetQuiz}>
                        <Text style={{fontSize: 18, color: white}}>Start Over</Text>
                    </DecisionButton>
                    <DecisionButton type={'incorrect'} onPress={() => this.props.navigation.navigate('DeckView', { deckId: deckId })}>
                        <Text style={{fontSize: 18, color: white}}>Back Deck</Text>
                    </DecisionButton>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        alignItems:'center',
        justifyContent: 'flex-start',
        margin: 8,
        backgroundColor: white,
        borderRadius: 12,
        width:400
    },
    correctColorText: {
        color: '#68fe19',
    },
    incorrectColorText: {
        color: red,
    },
    normaltext:{

        fontSize: 20,
        textAlign: 'center'
    },
    textContainer:{
        flexDirection:'column'
    },
    buttonContainer: {
        flexDirection:'column',
        alignItems:'center',
        marginTop:1
    }
})
export default Summary