import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Input from "../components/Input";

import { useGlobalContext } from "../context"; 
import BackButton from "../components/BackButton";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LargeButton from "../components/LargeButton";


type InputProps = {
  handleSuccess?: () => void;
};

export default function UserPasswordForm({ handleSuccess }: InputProps) {
    const { apiURL, apiToken, fonts } = useGlobalContext(); 

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Object>({});

    const handleInputChange = (field: string, value: string) => {
        setErrors({})
      
        if (field === "currentPassword") setCurrentPassword(value);
        if (field === "newPassword") setNewPassword(value);
    };

    const handleBack = () => {
        setNewPassword("")
        setCurrentPassword("")
        setErrors({})
        if (handleSuccess) {
            handleSuccess();
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
      
            const response = await fetch(apiURL + "user/password", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + apiToken
              },
              body: JSON.stringify({
                "current_password": currentPassword,
                "new_password": newPassword,
              }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              handleBack()
            } else {
              console.log(data)
              setErrors(data.errors)
            }
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView style={[styles.scrollViewContent]}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: Dimensions.get("window").height
            }}>
                <BackButton extraStyle={{}} onPress={handleBack} isVertical={true} />
        
                <Input
                    label="Váše heslo"
                    placeholder="Sar-SK_isT1p"
                    value={currentPassword}
                    icon="password"
                    onChangeText={(value) => handleInputChange("currentPassword", value)}
                    extraStyle={styles.spacing}
                    error={errors.current_password}
                    keyboardType="visible-password"
                />

                <Input
                    label="Váše nové heslo"
                    placeholder="Sar-SK_isT1p"
                    value={newPassword}
                    icon="password"
                    onChangeText={(value) => handleInputChange("newPassword", value)}
                    extraStyle={styles.spacing}
                    error={errors.new_password}
                    keyboardType="visible-password"
                />

                <LargeButton 
                    noIcon={true} 
                    label={loading ? "..." : "Uložiť"}
                    extraStyle={{fontFamily: fonts[2], fontSize: 20,}} 
                    isPending={false} 
                    onPress={handleSave} 
                />
            </View>
        </KeyboardAwareScrollView>
    )
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
  });
  

