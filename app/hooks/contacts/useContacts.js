import * as Contacts from "expo-contacts";
import { Alert } from "react-native";
const checkPermissions = async () => {
  const { granted } = await Contacts.requestPermissionsAsync();
  if (!granted)
    return Alert.alert(
      "Contact Permission Denied",
      "Please go into your settings and allow Invite Everyone to have access to your contacts in order to continue."
    );
  console.log("contacts granted");
  return true;
};

async function getContacts() {
  if ((await checkPermissions()) != true) return;
  const contacts = await Contacts.getContactsAsync();
  console.log(contacts.data.length, "contacts retrieved.");
  return contacts.data;
}

export default { getContacts };
