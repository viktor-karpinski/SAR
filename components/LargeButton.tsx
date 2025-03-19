import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  label: string;
  onPress: () => void;
  extraStyle: Object;
  isPending: Boolean | null;
  noIcon?: Boolean | null;
};


export default function LargeButton({
    label,
    onPress,
    extraStyle,
    isPending,
    noIcon,
  }: Props) {
    return (
        <TouchableOpacity style={[styles.button, extraStyle, isPending && styles.pending]} onPress={onPress}>
            {(!isPending && !noIcon) && <Svg width="35" height="37" viewBox="0 0 35 37" fill="none">
                <Path
                    d="M17.5 7.54456V28.6693"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
                <Path
                    d="M7.29175 18.1069H27.7084"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
            </Svg>}
            <Text style={[styles.label, extraStyle, isPending && styles.pendingLabel]}>
                {(isPending) ? (noIcon ? label: "Aktuálny Zásah") : label} 
            </Text>
            {(isPending && !noIcon) && <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                d="M10.83 24L9 22L19.5 11.996L9 2L10.83 0L23 11.996L10.83 24Z"
                fill="white"
                />
                <Path
                d="M2.83 24L1 22L11.5 11.996L1 2L2.83 0L15 11.996L2.83 24Z"
                fill="white"
                />
            </Svg>}
        </TouchableOpacity>
    );
}
  
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#154FA1",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        height: 60,
        paddingInline: 15,
        width: "100%",
        borderRadius: 2,
    },

    label: {
        fontSize: 26,
        textAlign: "center",
        fontFamily: "Contrail One",
        color: "#ffffff",
        marginLeft: 15,
        marginRight: 30,
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

    pending: {
        backgroundColor: "#DE261A"
    },

    pendingLabel: {
        marginLeft: 30,
        marginRight: 15,
    },
});