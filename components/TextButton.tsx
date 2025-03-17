import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  highlight: string;
  onPress: () => void;
  extraStyle: Object;
};


export default function Input({
    label,
    highlight,
    onPress,
    extraStyle
  }: Props) {
      
    return (
        <TouchableOpacity style={[styles.button, extraStyle]} onPress={onPress}>
            <Text style={styles.label}>
                {label}{"\n"}
                <Text style={styles.highlight}>
                    {highlight}
                </Text>
            </Text>
        </TouchableOpacity>
    );
}
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",
        justifyContent: "space-between",
        alignItems: "center",

        alignSelf: "center",
    },

    label: {
        fontSize: 18,
        textAlign: "center",
        fontFamily: "Hammersmith",
        color: "#ffffff"
    },

    highlight: {
        color: "#4A8DEC",
        textDecorationLine: "underline",
        textDecorationColor: "#4A8DEC",
        textTransform: "uppercase"
    }
});