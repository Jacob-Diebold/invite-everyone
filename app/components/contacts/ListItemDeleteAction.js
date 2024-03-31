import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ListItemDeleteAction({ onPress, width = 70 }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { width: width }]}>
        <Feather style={styles.icon} name="delete" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",

    height: "100%",
    // borderTopLeftRadius: 4,
    // borderBottomLeftRadius: 4,
    // borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
});
