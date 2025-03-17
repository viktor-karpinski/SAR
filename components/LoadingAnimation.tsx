import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const LoadingAnimation = () => {
    const rotateAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startRotation = () => {
            rotateAnimation.setValue(0);
            Animated.timing(rotateAnimation, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear,
            }).start(() => startRotation());
        };

        startRotation();
    }, [rotateAnimation]);

    const rotation = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={{ width: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animated.View
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    borderWidth: 10,
                    borderColor: "#4B4B4B",
                    borderRightColor: "#154FA1",
                    borderLeftColor: "#154FA1",
                    transform: [{ rotate: rotation }],
                }}
            />
        </View>
    );
}

export default LoadingAnimation;
