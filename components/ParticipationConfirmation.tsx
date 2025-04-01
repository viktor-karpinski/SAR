import { useGlobalContext } from "./../context";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    event: number;
    hasAlreadyAnswered: Boolean,
    status: number,
};

const ParticipationConfirmation = ({ event, hasAlreadyAnswered, status }: Props) => {
    const { apiURL, apiToken, setCurrentEvent, fonts } = useGlobalContext();
    const declineWidth = useRef(new Animated.Value((Dimensions.get("window").width / 2) - 20)).current;
    const confirmWidth = useRef(new Animated.Value((Dimensions.get("window").width / 2) - 20)).current;
    const declineOpacity = useRef(new Animated.Value(1)).current;
    const confirmOpacity = useRef(new Animated.Value(1)).current;
    const [isAnimating, setIsAnimating] = useState<Boolean>(false);
    const [declineText, setDeclineText] = useState<String>("Nemôžem");
    const [acceptText, setAcceptText] = useState<String>("Zúčastňujem Sa");

    const sendConfirmation = async (decline: Boolean) => {
        const response = await fetch(apiURL + "event/" + event + "/" + (decline ? "decline" : "accept"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + apiToken,
            },
        });

        const data = await response.json();

        if (response.ok && data) {
            console.log("CONFIRMATION", data.users);
            setCurrentEvent(data)
        }
    };

    useEffect(() => {
        if (hasAlreadyAnswered) {
            animateButtons(status == 2)
        }
    }, [hasAlreadyAnswered])

    const animateButtons = (isDecline: boolean) => {
        setIsAnimating(true)
        if (isDecline) {
            setAcceptText("Zmenil som názor, zúčastňujem sa")
            Animated.timing(declineWidth, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(confirmWidth, {
                toValue: Dimensions.get("window").width - 40,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(declineOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(confirmOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            setDeclineText("Zmenil som názor, nemôžem")
            Animated.timing(confirmWidth, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(declineWidth, {
                toValue: Dimensions.get("window").width - 40,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(confirmOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
            Animated.timing(declineOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setTimeout(() => {
            setIsAnimating(false)
        }, 200)
    };

    const handleDecline = () => {
        animateButtons(true);
        sendConfirmation(true);
    };

    const handleAccept = () => {
        animateButtons(false);
        sendConfirmation(false);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.btn, styles.decline, { width: declineWidth, opacity: declineOpacity }]}>
                <TouchableOpacity onPress={handleDecline}>
                    <Text style={[styles.text, {fontFamily: fonts[2]}]}>{!isAnimating && declineText}</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.btn, styles.confirm, { width: confirmWidth, opacity: confirmOpacity }]}>
                <TouchableOpacity onPress={handleAccept}>
                    <Text style={[styles.text, {fontFamily: fonts[2]}]}>{!isAnimating && acceptText}</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 3,
        overflow: "hidden",
    },
    btn: {
        height: 60,
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
    },
    decline: {
        backgroundColor: "#47484880",
    },
    confirm: {
        backgroundColor: "#154FA1",
    },
});

export default ParticipationConfirmation;
