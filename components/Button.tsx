import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

type InputProps = {
  label: string;
  onPress: () => void;
  extraStyle: Object;
};


export default function Button({
    label,
    onPress,
    extraStyle
  }: InputProps) {
      
    return (
        <TouchableOpacity style={[styles.button, extraStyle]} onPress={onPress}>
            <Text style={styles.label}>
                {label}
            </Text>
            <View style={styles.contaienr}>
                <View style={styles.line}></View>
                <Image source={require("../assets/arrows-right.png")} style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#154FA1",

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        alignSelf: "flex-end",

        height: 55,
        paddingInline: 15,
    },

    label: {
        fontSize: 19,
        textAlign: "center",
        fontFamily: "Hammersmith",
        color: "#ffffff"
    },

    contaienr: {
        flexDirection: "row",
        alignItems: "center",
    },

    line: {
        width: 2,
        height: 30,
        backgroundColor: "#ffffff",
        marginHorizontal: 18,
    },

    icon: {
        width: 24,
        height: 24,
    },
});