import { Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialSymbolTypes } from "@/types/MaterialSymbolTypes";
import MaterialSymbol from "./MaterialSymbol";

interface Props {
  label: string;
  primary?: boolean;
  icon?: MaterialSymbolTypes;
  onPress: () => void;
}

export default function Button({
  primary = false,
  label,
  icon,
  onPress,
}: Props) {
  let buttonStyle = styles.button;
  let labelStyle = styles.label;
  let iconColor = "#ff7733";

  if (primary) {
    buttonStyle = styles.buttonPrimary;
    labelStyle = styles.labelPrimary;
    iconColor = "#ffffff";
  }

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <View style={styles.buttonContent}>
        {icon ? (
          <MaterialSymbol name={icon} size={24} color={iconColor} />
        ) : null}
        <Text style={labelStyle}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "auto",
    height: 48,
    maxHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ff7733",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  buttonPrimary: {
    width: "auto",
    height: 48,
    maxHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 8,
    backgroundColor: "#ff7733",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#ff7733",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  labelPrimary: {
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
