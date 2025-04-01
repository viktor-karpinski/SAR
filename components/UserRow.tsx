import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { useGlobalContext } from "../context";

type Props = {
    user: Object;
};

const UserRow = ({ user }: Props) => {
    const extraHeight = useRef(new Animated.Value(0)).current;
    const extraOpacity = useRef(new Animated.Value(0)).current;
    const rotation = useRef(new Animated.Value(0)).current;
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const { fonts } = useGlobalContext();

    const handleInfoButton = () => {
        if (!isOpen) {
            setIsOpen(true);
            Animated.timing(extraHeight, {
                toValue: 70,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(extraOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(rotation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            setIsOpen(false);
            Animated.timing(extraHeight, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(extraOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
            Animated.timing(rotation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    return (
        <View style={[styles.container]}>
            <View style={styles.wrapper}>
                <Text style={[styles.text, {fontFamily: fonts[1]}]}>{user.name}</Text>
                <TouchableOpacity onPress={handleInfoButton} style={styles.button}>
                    <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <Defs>
                                <ClipPath id="clip0_111_47">
                                    <Rect width="18" height="18" fill="white" transform="matrix(0 1 -1 0 18 0)" />
                                </ClipPath>
                            </Defs>
                            <G clipPath="url(#clip0_111_47)">
                                <Path d="M0 8.1225L1.5 6.75L9.003 14.625L16.5 6.75L18 8.1225L9.003 17.25L0 8.1225Z" fill="white" />
                                <Path d="M0 2.1225L1.5 0.75L9.003 8.625L16.5 0.75L18 2.1225L9.003 11.25L0 2.1225Z" fill="white" />
                            </G>
                        </Svg>
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.extra, { height: extraHeight, opacity: extraOpacity }]}>
                <Text style={[styles.text, {fontFamily: fonts[1]}, styles.small]}>{user.email}</Text>
                <Text style={[styles.text, {fontFamily: fonts[1]}, styles.small]}>{user.phone}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#4B4B4B",
        paddingLeft: 0,
        paddingRight: 0,
    },

    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    text: {
        fontSize: 20,
        color: "#ffffff",
    },

    small: {
        fontSize: 18,
        textTransform: "uppercase",
    },

    button: {
        height: 60,
        width: 60,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    extra: {
        flexDirection: "column",
        gap: 10,
        paddingLeft: 10,
    },
});

export default UserRow;
