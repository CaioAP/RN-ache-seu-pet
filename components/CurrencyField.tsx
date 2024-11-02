import { Theme } from "@/constants/Theme";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { TextInput } from "react-native-paper";

interface Props {
  label?: string;
  placeholder?: string;
  value: number | undefined;
  maxLength?: number;
  onChange: (currency: number) => void;
}

const formatToCurrency = (amount: number): string => {
  amount = amount / 100;
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

const parseCurrencyToNumber = (currency: string): number => {
  const [integerPart, decimalPart] = currency.split(",");
  return (
    Number(`${integerPart.replace(/[^0-9]/g, "")}.${decimalPart || 0}`) * 100
  );
};

const maskCurrency = (input: string): string => {
  const cleanedInput = Number(input.replace(/[^0-9]/g, ""));
  const paddedInput = cleanedInput.toString().padStart(3, "0");
  const integerPart = paddedInput
    .slice(0, -2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimalPart = paddedInput.slice(-2);
  return `R$ ${integerPart},${decimalPart}`;
};

export default function CurrencyField({
  label,
  placeholder,
  value,
  maxLength = 18,
  onChange,
}: Props) {
  const onChangeText = (newValue: string) => {
    if (maxLength !== undefined && newValue.length >= maxLength) return;
    newValue = maskCurrency(newValue);
    onChange(parseCurrencyToNumber(newValue));
  };

  return (
    <TextInput
      mode="outlined"
      outlineColor="#aaaaaa"
      placeholderTextColor="#aaaaaa"
      keyboardType="numeric"
      label={label}
      placeholder={placeholder}
      value={formatToCurrency(value || 0)}
      style={styles.input}
      outlineStyle={styles.inputWrapper}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: Theme.borderRadius,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
