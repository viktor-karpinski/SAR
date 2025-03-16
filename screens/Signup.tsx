import React, { useState } from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";

import { useGlobalContext } from "../context"; 
import BackButton from "../components/BackButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


type InputProps = {
  extra: Object;
  onLoginRedirect?: () => void;
};

export default function SignupScreen({ extra, onLoginRedirect }: InputProps) {
  const { setApiToken, setFirebaseToken, apiURL } = useGlobalContext(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Object>({});

  const handleLoginRedirect = () => {
    if (onLoginRedirect) {
      onLoginRedirect();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null, 
    }));
  
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhoneNumber(value);
    if (field === "password") setPassword(value);
  };

  const handleSignup = async () => {

    try {
      setLoading(true);

      const response = await fetch(apiURL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "password": password,
          "email": email,
          "name": name,
          "phone": phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFirebaseToken(data.firebase_token)
      } else {
        console.log(data)
        setErrors(data.errors)
      }
    } catch (error: any) {
      //Alert.alert("Error", error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <KeyboardAwareScrollView style={[styles.scrollViewContent, extra]}>
    <View style={
      {
        flex: 1,
        justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height
      }
    }>
      <BackButton extraStyle={{}} onPress={handleLoginRedirect} />
      
      <Input
        label="Váše meno"
        placeholder="Jan Novak"
        value={name}
        icon="person"
        onChangeText={(value) => handleInputChange("name", value)}
        extraStyle={styles.spacing}
        error={errors.name}
      />

      <Input
        label="Váš email"
        placeholder="jan@novak.sk"
        value={email}
        icon="email"
        onChangeText={(value) => handleInputChange("email", value)}
        extraStyle={styles.spacing}
        error={errors.email}
        keyboardType="email-address"
      />

      <Input
        label="Vaše telefónne číslo"
        placeholder="+421 901 234 567"
        value={phoneNumber}
        icon="phone"
        onChangeText={(value) => handleInputChange("phone", value)}
        extraStyle={styles.spacing}
        error={errors.phone}
        keyboardType="phone-pad"
      />

      <Input
        label="Váše heslo"
        placeholder="Sar-SK_isT1p"
        value={password}
        icon="password"
        onChangeText={(value) => handleInputChange("password", value)}
        extraStyle={styles.spacing}
        error={errors.password}
        keyboardType="visible-password"
      />

      <Button
        label={loading ? "..." : "Zaregistrujte sa"}
        onPress={handleSignup}
        extraStyle={{marginTop: 15}}
      />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 35,
  },

  scrollViewContent: {
    flexGrow: 1,
    
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
});
