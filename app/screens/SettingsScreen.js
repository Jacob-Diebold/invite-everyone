import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import appStyles from "../styles/appStyles";
import { Button } from "react-native-paper";
import colors from "../styles/colors";
import useStorage from "../hooks/useStorage";
import useConfig from "../hooks/useConfig";
import useMessageCount from "../hooks/useMessageCount";
import * as WebBrowser from "expo-web-browser";
import Connect from "../components/Connect";
import useReview from "../hooks/useReview";
export default function SettingsScreen({ navigation }) {
  const showTut = async () => {
    await useStorage.storeTutData(null);
    navigation.goBack();
  };
  const repeatTut = () => {
    Alert.alert(
      "Repeat Tutorial",
      "Are you sure you want to repeat the tutorial?",
      [
        { text: "Yes", onPress: showTut, style: "default" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleDelete = async () => {
    await useStorage.clearData();
    navigation.goBack();
  };
  const clearData = () => {
    Alert.alert(
      "Delete All Data",
      "Are you sure you want to delete all the app data? \nThis can not be undone!",
      [
        { text: "Delete", onPress: handleDelete, style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };
  const writeReview = () => {
    useReview.writeReview();
  };
  const showPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync(
        `https://inviteeveryoneapp.com/privacy`
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Trouble opening Privacy Policy. Please visit\n InviteEveryoneApp.com/policy."
      );
    }
  };
  const showTerms = async () => {
    try {
      await WebBrowser.openBrowserAsync(`https://inviteeveryoneapp.com/terms`);
    } catch (error) {
      Alert.alert(
        "Error",
        "Trouble opening Terms and Conditions. Please visit\n InviteEveryoneApp.com/terms."
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.colors.primary[300] },
      ]}
    >
      <ImageBackground
        style={styles.container}
        source={appStyles.background.default}
      >
        <View style={styles.listContainer}>
          <TouchableWithoutFeedback
            onLongPress={async () => {
              let count = await useMessageCount.checkMessageCount();
              let messages = " messages";
              if (count === null) {
                count = 0;
              }
              if (count === 1) {
                messages = " message";
              }
              Alert.alert(
                "Messages Sent",
                "You have sent " + count + messages + " to groups"
              );
            }}
          >
            <Text style={styles.text} suppressHighlighting={true}>
              Current Version: {useConfig.buildVersion}
            </Text>
          </TouchableWithoutFeedback>
          <Button
            style={[styles.button]}
            onPress={writeReview}
            mode="contained"
          >
            Leave a Review
          </Button>
          <Button
            style={[styles.button, { marginTop: 0 }]}
            onPress={repeatTut}
            mode="contained"
          >
            Repeat Tutorial
          </Button>
          <Button
            style={[
              styles.button,
              { backgroundColor: colors.colors.danger[300], marginBottom: 80 },
            ]}
            onPress={clearData}
            mode="contained"
          >
            Delete All Data
          </Button>

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.header}>Get In Contact</Text>
              <Connect />
            </View>
            <Button
              onPress={showPolicy}
              mode="contained"
              textColor={colors.colors.singletons.darkText}
              style={[
                styles.button,
                { backgroundColor: colors.colors.secondary[100] },
              ]}
            >
              View Privacy Policy
            </Button>
            <Button
              onPress={showTerms}
              mode="contained"
              textColor={colors.colors.singletons.darkText}
              style={[
                styles.button,
                { backgroundColor: colors.colors.secondary[100] },
              ]}
            >
              View Terms and Conditions
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.colors.primary[500],
    width: "100%",
    // left: "10%",
    borderRadius: 1,
    height: 60,
    justifyContent: "center",
    marginTop: 0,
    // borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: colors.colors.primary[700],
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    borderRadius: 0,
    fontFamily: appStyles.text.fontFamily,
  },
  content: { width: "100%", height: "100%", borderRadius: 0 },
  listContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 20,
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontFamily: appStyles.text.fontFamily,
    fontSize: appStyles.text.headerSize - 4,
    fontWeight: appStyles.text.headerWeight,
    marginBottom: 15,
    // marginTop: 10,
    alignSelf: "center",
  },
  connect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  header: {
    fontFamily: appStyles.text.fontFamily,
    fontSize: appStyles.text.headerSize,
    fontWeight: appStyles.text.headerWeight,
    alignSelf: "center",
    color: colors.colors.singletons.darkText,
  },
  footer: { justifyContent: "flex-end", flex: 1, marginBottom: 50 },
  footerContent: {
    alignSelf: "center",
    borderRadius: 5,
    paddingBottom: 20,
  },
});
