import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGlobalContext } from "../context";
import { useEffect, useRef, useState } from "react";

type Props = {
    isConfirmation: boolean;
    text: string;
    label: string;
    action?: () => void;
    visible: boolean;
    onClose: () => void;
}

const PopUp = ( { isConfirmation, text, label, action, visible, onClose } : Props ) => {
    const { fonts } = useGlobalContext();
    const [shouldRender, setShouldRender] = useState(visible);

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (visible) {
            setShouldRender(true);
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onClose();
                setShouldRender(false);
            });
        }
    }, [visible])

    const closePopUp = () => {
        onClose()
    }

    const handleClick = () => {
        if (action) action();
        onClose();
    }

    if (!shouldRender) return null;

    return (
        <Animated.View style={[styles.background, { opacity: opacityAnim } ]}>
            <Animated.View style={[styles.box, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={{fontSize: 30, fontFamily: fonts[2], color: "#ffffff", textAlign: "center"}}>
                    {text}
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={handleClick} style={[styles.button, isConfirmation && {width: "60%", backgroundColor: "#47484880"}]}>
                        <Text style={{fontSize: 20,fontFamily: fonts[0], color: "#ffffff"}}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                    {isConfirmation && <TouchableOpacity onPress={closePopUp} style={[styles.button, {width: "40%"}]}>
                        <Text style={{fontSize: 20,fontFamily: fonts[0], color: "#ffffff"}}>
                            {"Nie"}
                        </Text>
                    </TouchableOpacity>}
                </View>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: -20,
        top: 0,
        zIndex: 100,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#47484845",
        padding: 30,
    },

    box: {
        backgroundColor: "#191919",
        padding: 20,
        width: "100%",
        borderWidth: 3,
        borderColor: "#154FA1"
    },

    buttons: {
        width: "100%",
        marginTop: 40,
        flexDirection: "row",
        gap: 10,
    },

    button: {
        height: 50,
        width: "100%",
        backgroundColor: "#154FA1",
        color: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    }
});

export default PopUp;