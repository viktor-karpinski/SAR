import { StyleSheet, Text, ScrollView, View, Animated, Dimensions } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useGlobalContext } from "../context";
import SettingsButton from "../components/SettingsButton";
import { useRef } from 'react';
import UserEditForm from './UserEditForm';
import UserPasswordForm from './UserPasswordForm';

type InputProps = {
  extra: Object,
  onLogOut?: () => void,
  stacked?: () => void;
  back?: () => void;
}

export default function SettingsScreen({extra, onLogOut, stacked, back}: InputProps) {
  const { setApiToken, setFirebaseToken, setUser, setUsers, user, fonts } = useGlobalContext();
  const mainVertical = useRef(new Animated.Value(0)).current;
  const secondaryVertical = useRef(new Animated.Value(-Dimensions.get("window").height)).current
  const secondaryHorizontal = useRef(new Animated.Value(0)).current

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setApiToken("")
      setFirebaseToken("")
      setUser({})
      setUsers([])
      if (onLogOut) 
        onLogOut()
    } catch (error) {
      //console.error("Error logging out:", error);
    }
  };

  const handleShowUserEditForm = () => {
    Animated.timing(secondaryHorizontal, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainVertical, {
      toValue: Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    if (stacked) {
      stacked()
    }
  }

  const handleShowPasswordForm = () => {
    Animated.timing(secondaryHorizontal, {
      toValue: -Dimensions.get("window").width,
      duration: 0,
      useNativeDriver: false,
    }).start();

    Animated.timing(mainVertical, {
      toValue: Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    if (stacked) {
      stacked()
    }
  }

  const handleBack = () => {
    Animated.timing(mainVertical, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(secondaryVertical, {
      toValue: -Dimensions.get("window").height,
      duration: 500,
      useNativeDriver: false,
    }).start();

    if (back) {
      back()
    }
  }

  return (
    <View style={[{width: Dimensions.get("window").width,}, extra]}>
      <Animated.View style={[ { position: "absolute", top: mainVertical}]}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <View style={{marginBottom: 30}}>
            <Text style={[styles.text, {fontSize: 30, marginBottom: 10, fontFamily: fonts[1]}]}>
              {user.name}
            </Text>
            
            <Text style={[styles.text, {textTransform: "uppercase", fontFamily: fonts[1]}]}>
              {user.email}     |    {user.phone}
            </Text>
          </View>

          <View style={styles.settingsContainer}>
            <SettingsButton label="Upraviť Svoje Údaje" icon="edit" onPress={handleShowUserEditForm} />
            <SettingsButton label="Zmeniť Svoje Heslo" icon="lock" onPress={handleShowPasswordForm} />
            <SettingsButton label="Odhlásiť Sa" icon="logout" onPress={handleLogout} isLogout={true} />
          </View>
        </ScrollView>
      </Animated.View>

      <Animated.View style={[styles.container, {top: secondaryVertical, left: secondaryHorizontal}, styles.secondaryContainer]}>
        <UserEditForm handleSuccess={handleBack} handleDelete={handleLogout} />
        <UserPasswordForm handleSuccess={handleBack} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 20,
    paddingBottom: 120,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    height: Dimensions.get("screen").height
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "left"
  },

  settingsContainer: {
    width: "100%",
    flexShrink: 1,
    height: 200,
    overflow: "hidden"
  },

  secondaryContainer: {
    width: Dimensions.get("window").width * 2,
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingTop: 0,
    padding: 0
  },
});