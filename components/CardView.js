import React, { Component } from 'react'
import {Text, View, StyleSheet, Button} from "react-native";
import { lightgray, white } from "../utils/colors";

class CardView extends Component {
    state = {
        toggleAnswer: false
    }

    toggleAnswer = () => {
        this.setState({
            toggleAnswer: !this.state.toggleAnswer
        })
    }

    render() {
        const { question, answer } = this.props

        return(
            <View style={styles.card}>

                {!this.state.toggleAnswer ? <Text style={styles.question}>{question}</Text>  : <Text style={styles.answer}>{answer}</Text>}
                {!this.state.toggleAnswer ? <Button title='Show Answer' onPress={this.toggleAnswer} /> : <Button title='Show Question' onPress={this.toggleAnswer} />}

            </View>

        )
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'flex-start',
        margin: 8,
        backgroundColor: lightgray,
        borderRadius: 12,
        alignSelf: 'stretch',
        height:200
    },
    question: {
        color: white,
        fontSize: 42,
        marginTop: 10,
        textAlign: 'center'

    },
    answer: {
        color: white,
        fontSize: 38,
        marginTop: 10,
        textAlign: 'center'

    }
})
export default CardView