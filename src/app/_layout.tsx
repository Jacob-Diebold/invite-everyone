import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Bugsnag from "@bugsnag/expo";
Bugsnag.start();

export default function RootLayout() {
  useEffect(() => {
    console.log("Layout Mounted");
  }, []);

  return (
    <SafeAreaProvider>
      <Stack />
    </SafeAreaProvider>
  );
}
