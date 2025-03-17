import { Text, View, StyleSheet, TouchableOpacity, } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
    address: String,
    date: String,
    from: String,
    till: String,
    extra: Object,
    pressed?: () => void;
}

const PastEventRow = ({ address, date, from, till, extra, pressed }: Props) => {

    const handlePress = () => {
        if (pressed)
            pressed()
    }

    return (
        <TouchableOpacity style={[styles.container, extra]} onPress={handlePress}>
            <Text style={styles.heading}>
                {address}
            </Text>
            <Text style={styles.time}>
                {date}, {from} - {till}
            </Text>
            <View style={styles.icon}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <Path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <Path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: "#4B4B4B",
        borderWidth: 1,
        paddingTop: 15,
        paddingBottom: 20,
        paddingInline: 15,
        width: "100%",
        backgroundColor: "#191919B3"
    },
    heading: {
        fontSize: 18,
        fontFamily: "Beiruti",
        letterSpacing: 1.44,
        color: "white",
        marginBottom: 7,
    },
    time: {
        fontSize: 14,
        fontFamily: "Beiruti",
        letterSpacing: 1.12,
        color: "white",
    },
    icon: {
        position: "absolute",
        right: 15,
        top: "62%",
    }
});

export default PastEventRow;
