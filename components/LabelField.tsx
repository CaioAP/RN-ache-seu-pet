import { Theme } from "@/constants/Theme";
import { Text } from "react-native";

interface Props {
  required?: boolean;
  text?: string;
}

export default function LabelField({ text, required }: Props) {
  if (required) {
    return (
      <Text>
        {text}
        <Text
          style={{
            color: Theme.colors.error,
            fontSize: 12,
          }}
        >
          *
        </Text>
      </Text>
    );
  }
  return <Text>{text}</Text>;
}
