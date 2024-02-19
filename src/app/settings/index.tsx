import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Settings(): React.ReactNode {
  useEffect(() => {
    console.log("Settings page mounted");
  }, []);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Settings Page</Text>
    </View>
  );
}
