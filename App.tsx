import React, { useRef, useState } from 'react';
import { Dimensions, Animated } from 'react-native';
import Background from './components/Background';
import GlobalProvider from './context';
import Auth from './components/Auth';
import Main from './components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const authVertical = useRef(new Animated.Value(0)).current;
  const navVertical = useRef(new Animated.Value(-200)).current;
  const appVertical = useRef(new Animated.Value(-(2*Dimensions.get("window").height))).current;

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

  const handleLogout = () => {
    Animated.timing(appVertical, {
      toValue: -(Dimensions.get("window").height),
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(navVertical, {
      toValue: -100,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(authVertical, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setIsAuthenticated(false)
    }, 300)
  }

  return (
    <SafeAreaProvider>
      <GlobalProvider>
        <Background>
          <Auth authVertical={authVertical} handleAuth={handleAuthSuccess} />
          {isAuthenticated && <Main navVertical={navVertical} appVertical={appVertical} handleLogout={handleLogout} />}
        </Background>
      </GlobalProvider>
    </SafeAreaProvider>
  );
};

//<Text style={{fontFamily: "Menlo", color: "#ffffff"}} selectable>SAR2 Firebase Notifications (token: {recievedToken})</Text>

export default App;