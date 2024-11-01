import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialSymbolTypes } from "@/types/MaterialSymbolTypes";
import MaterialSymbol from "./MaterialSymbol";
import { useEffect, useRef } from "react";
import { Theme } from "@/constants/Theme";

interface Props {
  label: string;
  primary?: boolean;
  icon?: MaterialSymbolTypes;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export default function Button({
  primary = false,
  label,
  icon,
  loading,
  disabled,
  onPress,
}: Props) {
  let buttonStyle = styles.button;
  let labelStyle = styles.label;
  let iconColor = Theme.colors.primary;

  if (primary) {
    buttonStyle = styles.buttonPrimary;
    labelStyle = styles.labelPrimary;
    iconColor = Theme.colors.background;
  }

  if (loading) {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }, []);

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <Pressable
        style={[buttonStyle, styles.buttonDisabled]}
        disabled
        onPress={onPress}
      >
        <View style={styles.buttonContent}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialSymbol name="refresh" size={24} color={iconColor} />
          </Animated.View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[buttonStyle, disabled ? styles.buttonDisabled : null]}
      disabled={disabled}
      onPress={onPress}
    >
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
    borderColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius,
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
    borderRadius: Theme.borderRadius,
    backgroundColor: Theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: Theme.colors.primary300,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: Theme.colors.primary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
  labelPrimary: {
    color: Theme.colors.background,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
