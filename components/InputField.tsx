import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

import { Theme } from "@/constants/Theme";
import LabelField from "./LabelField";

interface Props {
  label?: string;
  placeholder?: string;
  initValue: string | undefined;
  maxLength?: number;
  multiline?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (text: string) => void;
}

export default function InputField({
  label,
  placeholder,
  initValue,
  maxLength,
  multiline,
  required,
  error,
  errorMessage,
  onChange,
}: Props) {
  const [value, setValue] = useState(initValue);

  const onChangeText = (text: string) => {
    if (maxLength !== undefined && text.length >= maxLength) return;
    setValue(text);
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        outlineColor="#aaaaaa"
        placeholderTextColor="#aaaaaa"
        label={<LabelField text={label} required={required} />}
        placeholder={placeholder}
        value={value}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        error={error}
        style={styles.input}
        outlineStyle={styles.inputWrapper}
        onChangeText={onChangeText}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    borderRadius: Theme.borderRadius,
  },
  input: {
    backgroundColor: Theme.colors.background,
  },
  errorMessage: {
    marginTop: 2,
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 16,
    color: Theme.colors.error,
  },
});
