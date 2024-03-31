import { StyleSheet, View } from "react-native";
import colors from "../styles/colors";
export default function MessageBox({ children, textStyle }) {
  return (
    <View style={[styles.messageBox, { marginTop: 10 }]}>
      <View style={[styles.messageVisual, textStyle]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  messageBox: {
    borderColor: colors.colors.grey[500],
    borderWidth: 0,
    width: "90%",
    marginVertical: 8,
    borderRadius: 5,
    padding: 3,
    backgroundColor: colors.colors.primary[200],
    zIndex: 0,
    alignItems: "center",
  },
  messageVisual: {
    width: 10,
    height: 10,
    position: "absolute",
    bottom: 2,
    left: -15,
    borderColor: colors.colors.grey[500],
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: colors.colors.primary[200],
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    transform: [{ rotate: "240deg" }],
    zIndex: 1,
  },
});
