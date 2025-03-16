import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, StyleSheet } from "react-native";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import NavBar from "./NavBar";

type Props = {
    navVertical: Animated.Value;
    appVertical: Animated.Value;
};

const Main = ({navVertical, appVertical}: Props) => {
    const [recievedToken, setRecievedToken] = useState("");
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
            //Alert.alert('FCM Token stored successfully:', data);
        } catch (error) {
            //Alert.alert('Failed to get FCM token: ' + error);
        }
    };

    const handleTabSwitch = () => {
        Animated.timing(appHorizontal, {
            toValue: -currentTab * Dimensions.get("window").width,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    const handleStackedHomeScreen = () => {
        Animated.timing(navVertical, {
            toValue: -100,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }
    
    const handleBackHomeScreen = () => {
        Animated.timing(navVertical, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
    }

    return (
        <>
            <NavBar extra={{bottom: navVertical}} currentTab={currentTab} setCurrentTab={setCurrentTab} onTabSwitch={handleTabSwitch} />
            <Animated.View style={[styles.appContainer, {top: appVertical, left: appHorizontal}]}>
                <HomeScreen
                    extra={{
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height,
                    
                }}
                stacked={handleStackedHomeScreen}
                back={handleBackHomeScreen}
                />
                <MembersScreen
                    extra={{
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height,
                }}
                />
                <SettingsScreen
                    extra={{
                    width: Dimensions.get("screen").width,
                    height: Dimensions.get("screen").height,
                }}
                onLogOut={handleLogout}
                />
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
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

export default Main