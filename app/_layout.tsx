import { Stack } from "expo-router";
import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import { Theme } from "@/constants/Theme";

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);

  return (
    <PaperProvider theme={Theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
