import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const Button = ({calculate, size, text, theme}) => {

    const styles = StyleSheet.create({
        text: {
            color: 'black',
            fontSize: 35
        },
        button: {
            // flex: 1,
            height: 91,
            width: 91,
            alignItems: "center",
            justifyContent: "center",
            margin: 1,
            backgroundColor: theme
        },
        zero: {
            height: 91,
            width: 184,
            paddingLeft: 35,
            alignItems: 'flex-start',
            justifyContent: 'center',
            margin: 1,
            backgroundColor: theme
        }
    });


    return (
        <TouchableOpacity onPress={() => calculate(text)} style={size === 1 ? styles.button : styles.zero}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button