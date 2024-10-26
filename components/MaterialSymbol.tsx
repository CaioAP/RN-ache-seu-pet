import { SvgXml } from "react-native-svg";
import { Rounded } from "@/constants/MaterialSymbolsIconSet";
import { MaterialSymbolTypes } from "@/types/MaterialSymbolTypes";

interface Props {
  name: MaterialSymbolTypes;
  color?: string;
  size?: number;
  filled?: boolean;
}

export default function MaterialSymbol({
  name,
  color = "#FF7733",
  size = 24,
  filled = false,
}: Props) {
  return <SvgXml xml={Rounded[name]} width={size} height={size} fill={color} />;
}
