import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";

class DecisionButton extends Component {
    render(){
        const { onPress, type } = this.props

        let opacity = this.props.disabled ? 1 : 0.5;
        return (
            <TouchableOpacity activeOpacity={opacity} onPress={onPress}
             style={type =='correct' ? styles.correctButton : styles.incorrectButton}>
                {this.props.children}

            </TouchableOpacity>
        )
    }

}

DecisionButton.defaultProps = {disabled:false};

const styles = StyleSheet.create({
    correctButton: {
        width:'50%',
        justifyContent: "center",
        alignItems: "center",
        padding:20,
        margin:20,
        backgroundColor: '#b71845',
        borderRadius: 8
    },
    incorrectButton: {
        width:'50%',
        backgroundColor: '#FC3768',
        padding:20,
        margin:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    }

})

export default DecisionButton