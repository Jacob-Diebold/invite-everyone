import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import colors from "../../styles/colors";
import MessageBox from "../MessageBox";
import TutorialModal from "./TutorialModal";
export default function Step0({ nextStep, prevStep }) {
  return (
    <SafeAreaView style={styles.screenCover}>
      <TutorialModal
        headerTitle={"Welcome"}
        nextStep={nextStep}
        prevStep={prevStep}
        prevActive={false}
        style={{ top: 70 }}
      >
        <View style={{ alignItems: "center" }}>
          <MessageBox>
            <Text
              variant="bodyMedium"
              style={{ textAlign: "center", marginVertical: 5 }}
            >
              Thanks for downloading Invite Everyone!
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              We are a mass texting app that allows you to message a lot of
              people quickly without having to put everyone in a single group
              chat together
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              This works by connecting to your normal messages app and sending
              an individual personalized message to each person you want to
            </Text>
          </MessageBox>
          <View style={{ height: 100 }} />
        </View>
      </TutorialModal>
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
});
