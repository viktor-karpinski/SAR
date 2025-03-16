import React, { useEffect, useRef, useState } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import Background from './components/Background';
import GlobalProvider from './context';
import Auth from './components/Auth';
import checkUserAuthentication from './checkUserAuthentication'
import Main from './components/Main';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const authVertical = useRef(new Animated.Value(0)).current;
  const navVertical = useRef(new Animated.Value(-200)).current;
  const appVertical = useRef(new Animated.Value(-(2*Dimensions.get("window").height))).current;

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    let authenticated = await checkUserAuthentication();
    setIsAuthenticated(authenticated.isAuthenticated);

    if (authenticated.isAuthenticated) {
      handleAuthSuccess()
    } 
  }

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
        <Auth authVertical={authVertical} handleAuth={handleAuthSuccess} />
        {isAuthenticated && <Main navVertical={navVertical} appVertical={appVertical} />}
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
});

export default App;