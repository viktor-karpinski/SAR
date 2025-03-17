import React, { useState, memo } from "react";
import { TextInput, StyleSheet, View, Text, Image } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  secondPlaceholder?: string;
  value: string;
  secondValue?: string;
  icon: string;
  onChangeText: (text: string) => void;
  secondOnChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: string;
  extraStyle: Object;
  error?: string;
  autoCorrect?: boolean;
};

const iconMapping: { [key: string]: any } = {
  email: require("../assets/email.png"),
  password: require("../assets/lock.png"),
  location: require("../assets/location.png"),
  globe: require("../assets/globe.png"),
  phone: require("../assets/phone.png"),
  person: require("../assets/person.png"),
  error: require("../assets/error.png"),
};

const Input = memo(
  ({
    label,
    placeholder,
    secondPlaceholder,
    value,
    secondValue,
    icon,
    onChangeText,
    secondOnChangeText,
    secureTextEntry = false,
    keyboardType = "default",
    extraStyle,
    error,
    autoCorrect = false,
  }: Props) => {
    const imageSource = error ? iconMapping["error"] : iconMapping[icon];
    const [width, setWidth] = useState(0);
    const [isPasswordVisible, setIsPasswordVisible] = useState(icon != 'password');

    const handleLayout = (event: any) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
    };

    return (
      <View style={[styles.container, extraStyle]} onLayout={handleLayout}>
        <Text style={[styles.label, error && styles.errorText]}>
          {error || label}
        </Text>
        <View style={[styles.inputContainer]}>
          <Image source={imageSource} style={styles.icon} />
          <View style={[styles.line, error && styles.errorLine]}></View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              secondPlaceholder != undefined && { width: width / 2 + 22 },
              secondPlaceholder != undefined && styles.secondLeft,
              error && styles.errorBorder,
            ]}
            placeholder={placeholder}
            onChangeText={(text) => {
              onChangeText(text);
            }}
            autoCorrect={autoCorrect}
            //keyboardType={keyboardType}
            secureTextEntry={!isPasswordVisible}
            value={value}
            placeholderTextColor={"#474848"}
          />
          {secondPlaceholder != undefined && (
            <>
              <View style={[styles.line, { marginLeft: 0 }]}></View>
              <TextInput
                style={[
                  styles.input,
                  styles.second,
                  { width: width / 2 - 22 },
                ]}
                placeholder={secondPlaceholder}
                onChangeText={secondOnChangeText}
                //keyboardType={keyboardType}
                value={secondValue}
                placeholderTextColor={"#474848"}
              />
            </>
          )}
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.error === nextProps.error;
  }
);

export default Input;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 88,
    borderRadius: 20,
  },

  inputContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "rgba(25, 25, 25, 0.5)",
    position: "absolute",
    alignItems: "center",
    top: 30,
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },

  line: {
    width: 2,
    height: 35,
    backgroundColor: "#154FA1",
    marginLeft: 17,
    borderRadius: 2,
  },

  input: {
    height: 60,
    borderColor: "#154FA1",
    backgroundColor: "transparent",
    borderWidth: 2,

    fontSize: 18,

    paddingLeft: 75,
    fontFamily: "Hammersmith",
    color: "#ffffff",
    width: "100%",
    borderRadius: 4,
  },

  label: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
    fontFamily: "Hammersmith",
  },

  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  second: {
    paddingLeft: 15,
    borderLeftWidth: 0,
    marginLeft: -1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  secondLeft: {
    borderRightWidth: 0,
    marginRight: -1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  errorText: {
    color: "#DE2C1A",
  },

  errorLine: {
    backgroundColor: "#DE2C1A",
  },

  errorBorder: {
    borderColor: "#DE2C1A",
  },
});
