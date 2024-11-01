import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialSymbol from "./MaterialSymbol";
import { useState } from "react";

import { Theme } from "@/constants/Theme";
import LabelField from "./LabelField";

interface Props {
  label?: string;
  initValue: number;
  min?: number;
  max?: number;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange: (value: number) => void;
}

export default function NumberField({
  label,
  initValue,
  min,
  max,
  required,
  error,
  errorMessage,
  onChange,
}: Props) {
  const [value, setValue] = useState(String(initValue));

  const addValue = () => {
    const valueNumber = Number(value);
    if (max !== undefined && valueNumber >= max) return;
    setValue(String(valueNumber + 1));
  };

  const substractValue = () => {
    const valueNumber = Number(value);
    if (min !== undefined && valueNumber <= min) return;
    setValue(String(valueNumber - 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable
          style={[
            styles.button,
            styles.subtractButton,
            error ? styles.buttonError : null,
          ]}
          onPress={substractValue}
        >
          <MaterialSymbol name="remove" />
        </Pressable>
        <TextInput
          mode="outlined"
          label={<LabelField text={label} required={required} />}
          value={value}
          editable={false}
          error={error}
          style={styles.input}
          outlineStyle={styles.inputWrapper}
          outlineColor="#aaaaaa"
          onChangeText={() => onChange(Number(value))}
        />
        <Pressable
          style={[
            styles.button,
            styles.addButton,
            error ? styles.buttonError : null,
          ]}
          onPress={addValue}
        >
          <MaterialSymbol name="add" />
        </Pressable>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    paddingHorizontal: 8,
    backgroundColor: Theme.colors.background,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  buttonError: {
    borderWidth: 2,
    borderColor: Theme.colors.error,
  },
  subtractButton: {
    borderRightWidth: 0,
    borderTopLeftRadius: Theme.borderRadius,
    borderBottomLeftRadius: Theme.borderRadius,
  },
  addButton: {
    borderLeftWidth: 0,
    borderTopRightRadius: Theme.borderRadius,
    borderBottomRightRadius: Theme.borderRadius,
  },
  inputWrapper: {
    borderRadius: 0,
  },
  input: {
    flex: 1,
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
