import {initializeApp, getApps} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBBxTUTd2pa3sm4wL3IPTnBifB3AF-dg4I',
  authDomain: 'sar-sk.firebaseapp.com',
  projectId: 'sar-sk',
  storageBucket: 'sar-sk.appspot.com',
  messagingSenderId: '323121291519',
  appId: '1:323121291519:web:d97a620e651104181bacca',
  measurementId: 'G-FQ8MTRTXJ4',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {auth};
export default app;
