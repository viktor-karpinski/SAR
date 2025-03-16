import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import Background from './components/Background';
import GlobalProvider from './context';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';

const App: React.FC = () => {
  const [recievedToken, setRecievedToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const authHorizontal = useRef(new Animated.Value(0)).current;
  const authVertical = useRef(new Animated.Value(0)).current;
  const navVertical = useRef(new Animated.Value(-200)).current;
  const appVertical = useRef(new Animated.Value(-(2*Dimensions.get("window").height))).current;
  const appHorizontal = useRef(new Animated.Value(0)).current;
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        Alert.alert(
          'New Notification',
          JSON.stringify(remoteMessage.notification)
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const requestUserPermission = async (): Promise<void> => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission status:', authStatus);
      await getFcmToken();
    }
  };

  const getFcmToken = async (): Promise<void> => {
    try {
      const token = await messaging().getToken();
      setRecievedToken(token)

      const response = await fetch('https://sar.viktorkarpinski.com/api/store-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 1|0rVKv2hDe7zcXXYnTNU5khaZzpRUSP9uO11InQZ14edc10a1',
        },
        body: JSON.stringify({ 
          token: token 
        }),
      });

      const data = await response.json();
      Alert.alert('FCM Token stored successfully:', data);
    } catch (error) {
      Alert.alert('Failed to get FCM token: ' + error);
    }
  };

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
    setIsAuthenticated(true)
    Animated.timing(authVertical, {
      toValue: Dimensions.get("window").height,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(navVertical, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(appVertical, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, 300)
  }

  return (
    <GlobalProvider>
      <Background>
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
      </Background>
    </GlobalProvider>
  );
};

//<Text style={{fontFamily: "Menlo", color: "#ffffff"}} selectable>SAR2 Firebase Notifications (token: {recievedToken})</Text>

const styles = StyleSheet.create({
  background: {
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
  },

  authContainer: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    width: "200%",
    position: "absolute",
    top: 0,
  },
  appContainer: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "flex-start",
    width: Dimensions.get("window").width * 3,
    position: "absolute",
    zIndex: 0,
  }
});

export default App;