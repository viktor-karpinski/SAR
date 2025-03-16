import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

type InputProps = {
  onPress: () => void;
  extraStyle: Object;
  isVertical?: Boolean;
};


export default function BackButton({
    onPress,
    extraStyle,
    isVertical
  }: InputProps) {
      
    return (
        <TouchableOpacity style={[styles.button, extraStyle]} onPress={onPress}>
            {!isVertical &&
                <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                >
                    <Path
                    d="M13.17 0L15 2L4.5 12.004L15 22L13.17 24L1 12.004L13.17 0Z"
                    fill="white"
                    />
                    <Path
                    d="M21.17 0L23 2L12.5 12.004L23 22L21.17 24L9 12.004L21.17 0Z"
                    fill="white"
                    />
                </Svg>
            }
            {isVertical &&
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M24 13.17L22 15L11.996 4.5L2 15L0 13.17L11.996 1L24 13.17Z"
                  fill="white"
                />
                <Path
                  d="M24 21.17L22 23L11.996 12.5L2 23L0 21.17L11.996 9L24 21.17Z"
                  fill="white"
                />
              </Svg>
            }
        </TouchableOpacity>
    );
}
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 60,
        position: "absolute",
        top: 50, left: 20
    },
});