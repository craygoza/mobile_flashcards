import React, {Component } from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text} from "react-native";
import CardView from "./CardView";
import {white} from "../utils/colors";
import DecisionButton from "./DecisionButton";
import Summary from "./Summary";

class QuizView extends Component {

    state = {
        questionIndex: 0,
        correctAnswered: 0
    }

    resetQuiz = () => {
        this.setState({ questionIndex: 0,
                        correctAnswered: 0
         })
    }

    submit = (answer) => {
        const { questionIndex } = this.state
        const { deckId } =this.props.navigation.state.params
        const totalQuestions = deckId.item.questions.length

        let correctedAnswered = deckId.item.questions[questionIndex].correctAnswer.toUpperCase();

        if (questionIndex === totalQuestions){
            return
        }

        if (answer.toUpperCase() === correctedAnswered){
            this.setState({
                correctAnswered: this.state.correctAnswered + 1
            })
        }

        this.enableNextQuestion()
    }

    enableNextQuestion = () => {
        this.setState({
            questionIndex: this.state.questionIndex + 1
        })
    };

    render() {
        const { deckId } = this.props.navigation.state.params
        const totalQuestions = deckId.item.questions.length
        const questionIndex = this.state.questionIndex + 1

        return (

            <View style={{flex:1}} >
                { questionIndex > totalQuestions ?
                     <View>
                         <Summary correctedAnswered={this.state.correctAnswered} resetQuiz={this.resetQuiz} totalQuestions={totalQuestions} {...this.props} />
                     </View>
                    :
                    <View style={styles.container}>
                        <Text>Question : {questionIndex} of {deckId.item.questions.length}</Text>
                        <CardView title={deckId.item.title} question={deckId.item.questions[questionIndex - 1].question}
                                  answer={deckId.item.questions[questionIndex - 1].answer}/>

                        <DecisionButton type={'correct'} onPress={() => this.submit('Correct')}>
                            <Text style={{fontSize: 18, color: white}}>Correct</Text>
                        </DecisionButton>
                        <DecisionButton type={'incorrect'} onPress={() => this.submit('Incorrect')}>
                            <Text style={{fontSize: 18, color: white}}>Incorrect</Text>
                        </DecisionButton>

                    </View>
                }
            </View>
       )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
})

export default QuizView