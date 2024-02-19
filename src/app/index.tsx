import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Home(): React.ReactNode {
  useEffect(() => {
    console.log("Home page mounted");
  }, []);
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <Text>Home Page</Text>
    </View>
  );
}
