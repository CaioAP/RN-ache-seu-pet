import { Pressable, StyleSheet } from "react-native";

import { MaterialSymbolTypes } from "@/types/MaterialSymbolTypes";
import MaterialSymbol from "./MaterialSymbol";

interface Props {
  primary?: boolean;
  icon: MaterialSymbolTypes;
  onPress: () => void;
}

export default function ButtonIcon({ primary = false, icon, onPress }: Props) {
  let buttonStyle = styles.button;
  let iconColor = "#ff7733";

  if (primary) {
    buttonStyle = styles.buttonPrimary;
    iconColor = "#ffffff";
  }

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <MaterialSymbol name={icon} size={24} color={iconColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ff7733",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  buttonPrimary: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 8,
    backgroundColor: "#ff7733",
  },
});
