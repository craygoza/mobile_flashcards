import React, { Component } from 'react'
import {View, Text, StyleSheet, Animated,
    Image,
    Easing} from "react-native";
import {gray, lightgray, white} from "../utils/colors";
import DeckButton from "./DeckButton";
import DecisionButton from "./DecisionButton";

class DeckView extends Component {

    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
    }

    state = {
        loadingCompleted:false
    }

    componentDidMount(){
        this.spin()
    }

    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start(() => this.setState({loadingCompleted:true}))
    }

    render(){
        const { deckId } = this.props.navigation.state.params

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        return (
            <View>
                {!this.state.loadingCompleted ?
                    <View style={styles.containerAnimation}>
                        <Animated.Image
                            style={{
                                width: 350,
                                height: 350,
                                transform: [{rotate: spin}] }}
                            source={{uri: 'https://cdn.dribbble.com/assets/dribbble-ball-192-ec064e49e6f63d9a5fa911518781bee0c90688d052a038f8876ef0824f65eaf2.png'}}
                           // source={{uri: 'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png'}}
                        />
                    </View>
               :
                <View style={styles.container} >
                    <Text style={styles.maintext}> {deckId.item.title}</Text>
                    <Text style={styles.questiontext}>Total of Questions: {deckId.item.questions.length}</Text>

                    <DecisionButton type={'correct'} onPress={() => this.props.navigation.navigate('AddCard', { deckId:deckId })}>
                        <Text style={{fontSize: 18, color: white}}> Add Card</Text>
                    </DecisionButton>

                    <DecisionButton type={'incorrect'}  onPress={() => this.props.navigation.navigate('QuizView', { deckId:deckId  })}>
                        <Text style={{fontSize: 18, color: white}}>Start Quiz</Text>
                    </DecisionButton>
                </View> }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 15
    },
    container: {
        alignItems:'center',
        justifyContent: 'flex-start',
        margin: 8,
        backgroundColor: lightgray,
        borderRadius: 12,
        alignSelf: 'stretch',
        height:400
    },
    containerAnimation: {
        alignItems:'center',
        justifyContent: 'center',
        marginTop:100
    },
    maintext: {
        color: white,
        fontSize: 42,
        marginTop: 10,
        textAlign: 'center'

    },
    questiontext: {
        color: white,
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center'

    },
    deckButton: {  padding:10, borderRadius: 7, margin:0, height: 50, width:60 }
})
export default DeckView