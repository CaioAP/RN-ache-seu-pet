import { useTheme } from "react-native-paper";

import { Theme } from "@/constants/Theme";

export type AppTheme = typeof Theme;

export const useAppTheme = () => useTheme<AppTheme>();
