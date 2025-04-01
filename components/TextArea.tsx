import React, { useState } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { useGlobalContext } from "../context";

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
  const { fonts } = useGlobalContext();
  const [height, setHeight] = useState(60);

  const handleContentSizeChange = (event: any) => {
    setHeight(Math.max(60, event.nativeEvent.contentSize.height));
  };

  return (
    <View style={[styles.container, extraStyle]}>
      {label && <Text style={[styles.label, {fontFamily: fonts[2]}]}>{label}</Text>}
      <View style={styles.textAreaWrapper}>
        <TextInput
          style={[styles.textArea, {fontFamily: fonts[2]}]}
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
    textAlignVertical: "top", 
    lineHeight: 24,
    height: 100

  },
});
