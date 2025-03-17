import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useGlobalContext } from "../context";
import SettingsButton from "../components/SettingsButton";

type InputProps = {
  extra: Object,
  onLogOut?: () => void,
}

export default function SettingsScreen({extra, onLogOut}: InputProps) {
  const { setApiToken, setFirebaseToken, setUser, setUsers, user } = useGlobalContext();

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
  return (
      <ScrollView contentContainerStyle={[styles.container, extra]}>
        <View style={{marginBottom: 30}}>
          <Text style={[styles.text, {fontSize: 30, marginBottom: 10}]}>
            {user.name}
          </Text>
          
          <Text style={[styles.text, {textTransform: "uppercase"}]}>
            {user.email}     |    {user.phone}
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          <SettingsButton label="Upraviť Svoje Údaje" icon="edit" onPress={handleLogout} />
          <SettingsButton label="Zmeniť Svoje Heslo" icon="lock" onPress={handleLogout} />
          <SettingsButton label="Odhlásiť Sa" icon="logout" onPress={handleLogout} isLogout={true} />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 20,
    paddingBottom: 120,
    justifyContent: "space-between",
  },

  text: {
    color: "#ffffff",
    fontFamily: "BeirutiRegular",
    fontSize: 16,
    textAlign: "left"
  },

  settingsContainer: {
    width: "100%",
    flexShrink: 1,
    height: 200,
    overflow: "hidden"
  }
});