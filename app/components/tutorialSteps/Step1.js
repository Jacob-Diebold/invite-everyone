import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState } from "react";
import { Text, FAB } from "react-native-paper";
import colors from "../../styles/colors";
import MessageBox from "../MessageBox";
import TutorialModal from "./TutorialModal";
export default function Step1({
  nextStep,
  prevStep,
  setShowModal,
  setModalType,
}) {
  const [createGroup, setCreateGroup] = useState(false);
  return (
    <SafeAreaView style={styles.screenCover}>
      <TutorialModal
        headerTitle={"Create a Group!"}
        prevStep={prevStep}
        nextActive={false}
        style={{ top: 70 }}
      >
        <View style={{ alignItems: "center" }}>
          <MessageBox>
            <Text
              variant="bodyMedium"
              style={{ textAlign: "center", marginVertical: 5 }}
            >
              We are going to walk through creating your first group and sending
              a message!
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              The + button in the bottom right is how you add a new group.
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              Click it to create a group!
            </Text>
          </MessageBox>
        </View>
      </TutorialModal>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.colors.secondary[200] }]}
        onPress={() => {
          setCreateGroup(true);
          nextStep();
        }}
        customSize={60}
        color={colors.colors.dark[800]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenCover: {
    backgroundColor: colors.colors.primary[600],
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 30,
    borderRadius: 50,
  },
});
