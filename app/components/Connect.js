import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export default function Connect() {
  const emailUs = async () => {
    try {
      await Linking.openURL(`mailTo: InviteEveryoneApp@gmail.com`);
    } catch (error) {
      Alert.alert("Send Email to", "InviteEveryoneApp@gmail.com");
    }
  };
  const sendToFacebook = async () => {
    try {
      await Linking.openURL(`fb://profile/100087351372741`);
    } catch (error) {
      WebBrowser.openBrowserAsync(
        `https://www.facebook.com/profile.php?id=100087351372741`
      );
    }
  };
  const sendToInsta = async () => {
    await WebBrowser.openBrowserAsync(
      `https://www.instagram.com/inviteeveryoneapp/`
    );
  };
  return (
    <View style={styles.connect}>
      <TouchableOpacity onPress={sendToFacebook} style={styles.icon}>
        <Entypo name="facebook" size={40} color="#3b5998" />
      </TouchableOpacity>
      <TouchableOpacity onPress={emailUs} style={styles.icon}>
        <MaterialIcons name="email" size={45} color="#e3e3e3" />
      </TouchableOpacity>
      <TouchableOpacity onPress={sendToInsta} style={styles.icon}>
        <FontAwesome5 name="instagram-square" size={41} color="#E1306C" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  connect: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
