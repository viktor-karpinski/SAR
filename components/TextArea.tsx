import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  extraStyle?: Object;
};

export default function TextArea({
  label,
  placeholder,
  value,
  onChangeText,
  extraStyle,
}: Props) {
  const [height, setHeight] = useState(60); // Initial height of the TextInput

  const handleContentSizeChange = (event: any) => {
    setHeight(Math.max(60, event.nativeEvent.contentSize.height)); // Adjust height dynamically
  };

  return (
    <View style={[styles.container, extraStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.textAreaWrapper}>
        <TextInput
          style={[styles.textArea]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={true}
          placeholderTextColor="#474848"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: "Hammersmith One",
  },
  textAreaWrapper: {
    backgroundColor: "rgba(25, 25, 25, 0.5)",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#154FA1",
    padding: 10,
  },
  textArea: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: "Hammersmith One",
    textAlignVertical: "top", 
    lineHeight: 24,
    height: 100

  },
});
