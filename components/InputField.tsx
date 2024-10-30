import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  label?: string;
  placeholder?: string;
  initValue: string | undefined;
  maxLength?: number;
  onChange: (text: string) => void;
}

export default function InputField({
  label,
  placeholder,
  initValue,
  maxLength,
  onChange,
}: Props) {
  const [value, setValue] = useState(initValue);

  const onChangeText = (text: string) => {
    if (maxLength !== undefined && text.length >= maxLength) return;
    setValue(text);
    onChange(text);
  };

  return (
    <TextInput
      mode="outlined"
      outlineColor="#aaaaaa"
      placeholderTextColor="#aaaaaa"
      label={label}
      placeholder={placeholder}
      value={value}
      style={styles.input}
      outlineStyle={styles.inputWrapper}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
