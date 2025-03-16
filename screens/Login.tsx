import React, { useState } from "react";
import { StyleSheet, Alert, Image, View, Dimensions} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

import Button from "../components/Button";
import TextButton from "../components/TextButton";
import Input from "../components/Input";

import { useGlobalContext } from "../context"; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


type InputProps = {
  extra: Object;
  onSignupRedirect?: () => void;
  onAuthSuccess?: () => void;
};

export default function LoginScreen({ extra, onSignupRedirect, onAuthSuccess }: InputProps) {
  const { setApiToken, setFirebaseToken, apiURL, setUser } = useGlobalContext(); 

  const [email, setEmail] = useState("viktor@karpinski.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Object>({});

  const handleSignupRedirect = () => {
    if (onSignupRedirect) {
      onSignupRedirect();
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrors({
        email: ["Pole meno je povinné"], 
        password: ["Pole heslo je povinné"],
      })
      return;
    }

    //try {
      setLoading(true);

      Alert.alert("BEFORE FIREBASE, " + email + ", " + password)
      //const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //const user = userCredential.user;

      //if (user) {
        //const token = await user.getIdToken();

        //Alert.alert("FIREBASE SUCCESS " + token)

        /*const response = await fetch(apiURL + "auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "firebase_token": token,
          }),
        });
  
        const data = await response.json();

        if (response.ok && data) {
          Alert.alert("SUCCESS " + data)

          setApiToken(data.token)
          setFirebaseToken(token)
          setUser(data.user)
          if (onAuthSuccess)
            onAuthSuccess()
        } else {
          setErrors({
            email: ["E-mail alebo heslo je nesprávne"], 
          })
        }
      }*/
    /*} /*catch (error: any) {
      setErrors({
        email: ["E-mail alebo heslo je nesprávne"], 
      })
    } finally {
      setLoading(false);
    }*/
  }

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null, 
    }));
  
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  return (
    <KeyboardAwareScrollView style={[styles.scrollViewContent, extra]}>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').height
      }}>
        <Image source={require("../assets/sar-logo.png")} style={styles.logo} />

        <Input
          label="Váš email"
          placeholder="jan@novak.sk"
          value={email}
          icon="email"
          onChangeText={(value) => handleInputChange("email", value)}
          //keyboardType="email-address"
          extraStyle={styles.spacing}
          autoCorrect={false}
          //error={errors.email}
        />

        <Input
          label="Váše heslo"
          placeholder="Sar-SK_isT1p"
          value={password}
          icon="password"
          onChangeText={(value) => handleInputChange("password", value)}
          //keyboardType="visible-password"
          extraStyle={styles.spacing}
          autoCorrect={false}
          //error={errors.password}
        />

        <Button
          label={loading ? "Logging in..." : "Prihláste sa"}
          onPress={handleLogin}
          extraStyle={styles.spacingButton}
        />

        <TextButton
          label="Nemáte účet? Kliknite sem a "
          highlight="zaregistrujte sa."
          onPress={handleSignupRedirect}
          extraStyle={{}}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },

  spacing: {
    marginBottom: 30,
  },

  spacingButton: {
    marginTop: 15,
    marginBottom: 85
  },

  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
});
