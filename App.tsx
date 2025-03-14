import React, { useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

const App: React.FC = () => {
  useEffect(() => {
    // Request notification permissions on iOS
    requestUserPermission();

    // Listen for messages in the foreground
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

  /**
   * Request permission for iOS notifications.
   * If granted, retrieve and store the FCM token.
   */
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

  /**
   * Fetch the FCM token and send it to your Laravel API.
   */
  const getFcmToken = async (): Promise<void> => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      const response = await fetch('http://192.168.0.150:8001/api/store-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 129|U50uMXIdNdYU24ND2A3Vurh9zjHQ6vlQ5as7stZNfc935842',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      console.log('FCM Token stored successfully:', data);
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SAR2 Firebase Notifications (TypeScript)</Text>
    </View>
  );
};

export default App;