import { Pressable, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialSymbol from "./MaterialSymbol";
import { useState } from "react";

interface Props {
  label?: string;
  initValue: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function NumberField({
  label,
  initValue,
  min,
  max,
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
      <Pressable
        style={[styles.button, styles.subtractButton]}
        onPress={substractValue}
      >
        <MaterialSymbol name="remove" />
      </Pressable>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        editable={false}
        style={styles.input}
        outlineStyle={styles.inputWrapper}
        outlineColor="#aaaaaa"
        onChangeText={() => onChange(Number(value))}
      />
      <Pressable style={[styles.button, styles.addButton]} onPress={addValue}>
        <MaterialSymbol name="add" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#aaaaaa",
  },
  subtractButton: {
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  addButton: {
    borderLeftWidth: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputWrapper: {
    borderRadius: 0,
  },
  input: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
