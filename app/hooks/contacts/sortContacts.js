import { Alert } from "react-native";
//HANDLE CONTACTS THAT DONT HAVE NAMES
export default function sortContacts(contacts, currentContacts) {
  if (!contacts) return;
  const cleanedContacts = [];
  contacts.sort((a, b) => {
    try {
      let fa = a.name?.toLowerCase();
      if (fa === undefined) {
        fa = a.phoneNumbers[0].number;
      }
      let fb = b.name?.toLowerCase();
      if (fb === undefined) {
        fb = a.phoneNumbers[0].number;
      }
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    } catch (error) {
      console.log(error);
    }
  });
  contacts.map((item, index) => {
    if (item.phoneNumbers) {
      cleanedContacts.push(item);
    }
  });
  if (!cleanedContacts) {
    Alert.alert(
      "Error",
      "Error retrieving contacts.\nPlease submit feedback to developer\nError Code: 1-CON"
    );
  }
  if (cleanedContacts.length == 0) {
    Alert.alert(
      "Error",
      "Error retrieving contacts.\nPlease submit feedback to developer\nError Code: 2-CON"
    );
  }
  cleanedContacts.map((item, index) => {
    item.groupActive = true;
    item.active = false;
    item.index = index;
  });
  // console.log("Current Contacts:",currentContacts)
  currentContacts.forEach((contact) => {
    const foundContact = cleanedContacts.find((item) => item.id === contact.id);
    if (foundContact == undefined) {
      return;
    }
    cleanedContacts[foundContact.index].active = true;
  });
  return cleanedContacts;
}

const simpleSort = (contacts) => {
  const cleanedContacts = [];
  contacts.sort((a, b) => {
    let fa = a.name?.toLowerCase();
    if (fa === undefined) {
      fa = a.phoneNumbers[0].number;
    }
    let fb = b.name?.toLowerCase();
    if (fb === undefined) {
      fb = a.phoneNumbers[0].number;
    }
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};
export { simpleSort };
