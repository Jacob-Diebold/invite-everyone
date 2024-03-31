import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../../styles/colors";
import { Appbar, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import appStyles from "../../styles/appStyles";
export default function TutorialModal({
  headerTitle,
  children,
  nextStep,
  prevStep,
  style,
  prevActive = true,
  nextActive = true,
  showButtons = true,
  submitButton = false,
  submitAction
}) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.colors.grey[100],
          width: "80%",
          height: "60%",
          alignSelf: "center",
          position: "absolute",
          top: "25%",
          borderRadius: 8,
          shadowColor: "black",
          shadowOpacity: 0.4,
          shadowOffset: { width: 0, height: 1 },
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Appbar.Header
        style={[styles.bar, { backgroundColor: colors.colors.secondary[100] }]}
        title="Welcome"
      >
        <Appbar.Content title={headerTitle} titleStyle={styles.headerText} />
      </Appbar.Header>

      <Divider style={styles.headerDivider} />
      <ScrollView indicatorStyle="black">{children}</ScrollView>
      {submitButton && (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={submitAction}
              style={[
                styles.button,
                { backgroundColor: colors.colors.primary[300], flex:1 },
              ]}
            >
              <Text>Go to Full App</Text>
            </TouchableOpacity>
            </View>
          )}
      {showButtons && (
        <View style={styles.buttonContainer}>
         
          {prevActive ? (
            <TouchableOpacity
              onPress={prevStep}
              style={[
                styles.button,
                { backgroundColor: colors.colors.primary[100] },
              ]}
            >
              <Ionicons name="ios-arrow-back" size={30} color="black" />
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.button,
                { backgroundColor: colors.colors.grey[100] },
              ]}
            />
          )}
          {nextActive ? (
            <TouchableOpacity
              onPress={nextStep}
              style={[
                styles.button,
                { backgroundColor: colors.colors.primary[300] },
              ]}
            >
              <Ionicons name="ios-arrow-forward" size={30} color="black" />
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.button,
                { backgroundColor: colors.colors.grey[100] },
              ]}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    justifyContent: "center",
    overflow: "hidden",
  },
  headerText: {
    fontSize: appStyles.text.headerSize,
    fontFamily: appStyles.text.fontFamily,
    fontWeight: appStyles.text.headerWeight,
  },
  divider: {
    backgroundColor: colors.colors.dark[400],
  },
  headerDivider: {
    backgroundColor: colors.colors.dark[400],
    height: 1,
    marginBottom: 5,
  },
  messageBox: {
    borderColor: colors.colors.grey[500],
    borderWidth: 0,
    width: "90%",
    marginVertical: 8,
    borderRadius: 5,
    padding: 3,
    backgroundColor: colors.colors.primary[200],
    zIndex: 0,
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
  buttonContainer: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: -0.04,
    flexDirection: "row",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
