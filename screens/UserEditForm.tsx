import React, { useState } from "react";
import { View, StyleSheet, Alert, Dimensions, Text } from "react-native";
import Input from "../components/Input";

import { useGlobalContext } from "../context"; 
import BackButton from "../components/BackButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LargeButton from "../components/LargeButton";
import SettingsButton from "../components/SettingsButton";
import PopUp from "../components/PopUp";


type InputProps = {
  handleSuccess?: () => void;
  handleDelete?: () => void;
};

export default function UserEditForm({ handleSuccess, handleDelete }: InputProps) {
  const { user, apiURL, apiToken, setUser, fonts } = useGlobalContext(); 

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  const [errors, setErrors] = useState<Object>({});

  const handleBack = () => {
    if (handleSuccess) {
      handleSuccess();
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
  };

  const handleEdit = async () => {

    try {
      setLoading(true);

      const response = await fetch(apiURL + "user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + apiToken
        },
        body: JSON.stringify({
          "email": email,
          "name": name,
          "phone": phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user)
        handleBack()
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

  const deleteAccount = async () => {
    if(handleDelete) {
      let localToken = apiToken
      handleDelete()

      setIsPopUpVisible(false)

      const response = await fetch(apiURL + "user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + localToken
        },
      });
  
      if (response.ok) {
        if (handleBack)
          handleBack()
        if (handleDelete)
          handleDelete()
      } 
    }
  }

  return (
  <KeyboardAwareScrollView style={[styles.scrollViewContent]}>
    <PopUp text="Naozaj chcete odstrániť svoj účet?" label="Áno, som si istý" isConfirmation={true} visible={isPopUpVisible} onClose={() => setIsPopUpVisible(false)} action={deleteAccount} />

    <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get("window").height
      }
    }>
      <BackButton extraStyle={{}} onPress={handleBack} isVertical={true} />
      
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

      <LargeButton 
        noIcon={true} 
        label={loading ? "..." : "Uložiť"}
        extraStyle={{fontFamily: fonts[2], fontSize: 20,}} 
        isPending={false} 
        onPress={handleEdit} 
      />

      <Text style={[styles.heading, {fontFamily: fonts[1], marginTop: 40}]}>
        Iné Možnosti
      </Text>
      <View style={styles.hr}></View>
      <View style={styles.settingsContainer}>
        <SettingsButton label="Odstrániť Účet" icon="trash" onPress={() => {setIsPopUpVisible(true)}} isLogout={true} />
      </View>
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
    height: Dimensions.get("screen").height
  },

  settingsContainer: {
    width: "100%",
    flexShrink: 1,
    height: 80,
    overflow: "hidden"
  },

  heading: {
    fontSize: 22,
    letterSpacing: 1.76,
    color: "#ffffff",
    alignSelf: "flex-start",
    marginLeft: 0,
  },
  hr: {
    width: Dimensions.get("window").width + 40,
    height: 1,
    backgroundColor: "#4B4B4B",
    marginTop: 10,
    position: "relative",
    left: -20,
  },
});
