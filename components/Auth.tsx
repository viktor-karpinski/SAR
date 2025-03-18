import { Alert, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from "./../context"; 
import checkUserAuthentication from './../checkUserAuthentication'
import LoginScreen from './../screens/Login';
import SignupScreen from './../screens/Signup';

type Props = {
    authVertical: Animated.Value;
    handleAuth?: () => void;
};

export default function Auth({authVertical, handleAuth}: Props) {
    const { setApiToken, setFirebaseToken, firebaseToken, apiURL, setUser } = useGlobalContext(); 
    const authHorizontal = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        Alert.alert('getting api automaitcally')
        getApiToken()
    }, [firebaseToken])
    
    const checkAuth = async () => {
        let authenticated = await checkUserAuthentication();

        if (authenticated.isAuthenticated) {
            setFirebaseToken(authenticated.firebaseToken)
        } 
    }
    
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

    const getApiToken = async () => {
        const response = await fetch(apiURL + "auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firebase_token: firebaseToken,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok && data) {
          setApiToken(data.token);
          setUser(data.user)
          if (handleAuth) {
            handleAuth()
          }
        }
    }

    const handleAuthSuccess = () => {
        //getApiToken()
    }

    return (
        <Animated.View style={{
            flex: 1,
            flexDirection: "row",
            overflow: "hidden",
            width: "200%",
            position: "absolute",

            left: authHorizontal,
            top: authVertical,
        }}>
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