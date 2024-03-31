import { SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import useStorage from "../../hooks/useStorage";
export default function Step9({
  prevStep,
  nextStep,
  groupData,
  setGroupData,
  setShowTutorial,
  endTut,
}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.colors.primary[600],
        alignItems: "center",
      }}
    >
      <TutorialModal
        headerTitle={"Done!"}
        prevActive={false}
        nextActive={false}
        nextStep={nextStep}
        prevStep={prevStep}
        showButtons={false}
        submitButton={true}
        submitAction={async () => {
          await useStorage.storeTutData({ completed: true });
          setShowTutorial(false);
          endTut();
        }}
        style={{
          position: "relative",
          top: 0,
          marginTop: 30,
          height: 310,
          marginBottom: 25,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <MessageBox>
            <Text
              variant="bodyMedium"
              style={{ textAlign: "center", marginVertical: 5 }}
            >
              Thanks for going through this tutorial
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              You now know how to use this app!
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              I hope it makes your life easier when you Invite Everyone!
            </Text>
          </MessageBox>

          <View style={{ height: 100 }} />
        </View>
      </TutorialModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
