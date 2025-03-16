import { Animated, Dimensions, StyleSheet } from 'react-native';
import LoginScreen from './../screens/Login';
import SignupScreen from './../screens/Signup';
import { useRef } from 'react';

type Props = {
    authVertical: Animated.Value;
    handleAuth?: () => void;
  };

export default function Auth({authVertical, handleAuth}: Props) {
    const authHorizontal = useRef(new Animated.Value(0)).current;
    
    const handleScrollToSignup = () => {
        Animated.timing(authHorizontal, {
            toValue: -Dimensions.get("window").width,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    
    const handleScrollToLogin = () => {
        Animated.timing(authHorizontal, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleAuthSuccess = () => {
        if (handleAuth)
            handleAuth()
    }

    return (
        <Animated.View
            style={[
                styles.authContainer,
                {
                left: authHorizontal,
                top: authVertical,
                },
            ]}
        >
            <LoginScreen
                extra={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                }}
                onSignupRedirect={handleScrollToSignup}
                onAuthSuccess={handleAuthSuccess}
            />
            <SignupScreen
                extra={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                }}
                onLoginRedirect={handleScrollToLogin}
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    width: "200%",
    position: "absolute",
    top: 0,
  },
});