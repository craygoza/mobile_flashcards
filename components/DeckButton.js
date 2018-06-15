import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";

class DeckButton extends Component {
    render(){
        const { onPress } = this.props

        let opacity = this.props.disabled ? 1 : 0.5;
        return (
            <TouchableOpacity activeOpacity={opacity} onPress={onPress}
             style={styles.nextButton}>
                {this.props.children}

            </TouchableOpacity>
        )
    }

}

DeckButton.defaultProps = {disabled:false};

const styles = StyleSheet.create({
    wideButton: {
        justifyContent: "center",
        alignItems: "center",
        padding:10,
        margin:10,
        backgroundColor: '#b71845'
    },
    nextButton: {
        width: '100%',
        backgroundColor: '#FC3768',
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default DeckButton