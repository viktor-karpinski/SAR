import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, Platform, PermissionsAndroid } from "react-native";
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import NavBar from "./NavBar";
import { useGlobalContext } from "./../context";
import SettingsScreen from "../screens/Settings";
import MembersScreen from "../screens/Members";
import HomeScreen from "../screens/Home";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    navVertical: Animated.Value;
    appVertical: Animated.Value;
    handleLogout?: () => void;
};

const Main = ({navVertical, appVertical, handleLogout}: Props) => {
    const {apiURL, apiToken, setEvents, setHasEvent, setStackHome } = useGlobalContext(); 
    const [recievedToken, setRecievedToken] = useState("");
    const appHorizontal = useRef(new Animated.Value(0)).current;
    const [currentTab, setCurrentTab] = useState(0);

    const insets = useSafeAreaInsets();

    const safeBottom = insets?.bottom ?? 0;

    useEffect(() => {      
        requestUserPermission();

        const unsubscribe = messaging().onMessage(
            async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
                getEvents()
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);
    
    const requestUserPermission = async (): Promise<void> => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Notification Permission',
                    message: 'This app needs permission to send you alerts about events.',
                    buttonPositive: 'Allow',
                    buttonNegative: 'Deny',
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await getFcmToken();
            }
        } else {
            const authStatus = await messaging().requestPermission();
            const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                await getFcmToken();
            }
        }
    };
    
    const getFcmToken = async (): Promise<void> => {
        try {
            const token = await messaging().getToken();
            setRecievedToken(token)

            const response = await fetch(apiURL + 'store-fcm-token', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": "Bearer " + apiToken
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

    const getEvents = async () => {
        const response = await fetch(apiURL + "events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": "Bearer " + apiToken
          },
        });
    
        const data = await response.json();
    
        if (response.ok && data) {
            setEvents(data)
            setHasEvent(true)
            handleStackedHomeScreen()
            setStackHome(true)
        }
      }

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

    const localHandleLogout = () => {
        setTimeout(() => {
            setCurrentTab(0)
            handleTabSwitch()
        }, 1000)
        if (handleLogout)
            handleLogout()
    }

    return (
        <>
            <NavBar extra={{bottom: navVertical, paddingBottom: safeBottom, height: (80 + safeBottom)}} currentTab={currentTab} setCurrentTab={setCurrentTab} onTabSwitch={handleTabSwitch} />
            <Animated.View style={{
                flex: 1,
                flexDirection: "row",
                overflow: "hidden",
                alignItems: "flex-start",
                width: Dimensions.get("window").width * 3,
                position: "absolute",
                zIndex: 0,
                
                top: appVertical, left: appHorizontal
            }}>
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
                    onLogOut={localHandleLogout}
                    stacked={handleStackedHomeScreen}
                    back={handleBackHomeScreen}
                /> 
            </Animated.View>
        </>
    )
}

export default Main