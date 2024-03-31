import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import Card from "../Card";
export default function Step3({ prevStep, nextStep, groupData }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.colors.primary[600],
        alignItems: "center",
      }}
    >
      <TutorialModal
        prevActive={false}
        nextActive={false}
        showButtons={false}
        headerTitle={"Create a Group!"}
        style={{
          position: "relative",
          top: 0,
          marginTop: 50,
          height: 325,
          marginBottom: 40,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <MessageBox>
            <Text
              variant="bodyMedium"
              style={{
                marginVertical: 5,
                textAlign: "center",
              }}
            >
              Your groups will appear on the home screen like this
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              If you want to delete or edit the details of a group, you can
              simply hold it for the options to appear (This is disabled for
              this tutorial though)
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              To open a group, simply click it.
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              Do that now to continue!
            </Text>
          </MessageBox>
        </View>
      </TutorialModal>
      <Card
        style={{ marginTop: 30 }}
        groupData={groupData}
        sendGroup={() => null}
        setShowModal={() => null}
        groupSize={groupData.contactData.length}
        onPress={nextStep}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
