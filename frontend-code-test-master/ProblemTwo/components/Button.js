import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Button = ({calculate, size, text, theme}) => {

    console.log(windowHeight, windowWidth)


    const styles = StyleSheet.create({
        text: {
            color: 'black',
            fontSize: 35
        },
        button: {
            height: (windowHeight / 9),
            width: (windowWidth / 4.1),
            alignItems: "center",
            justifyContent: "center",
            margin: 1,
            backgroundColor: theme
        },
        zero: {
            height: (windowHeight / 9),
            width: (windowWidth / 2.02),
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