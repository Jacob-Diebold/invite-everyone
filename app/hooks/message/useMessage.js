import { Alert } from "react-native";
import * as SMS from "expo-sms";
import AlertAsync from "react-native-alert-async";
import findIndex from "../findGroupIndex";
import useStorage from "../useStorage";
export default useMessage = async (
  selectedGroupData,
  groupData,
  setGroupData,
  attachment,
  tutorial = false
) => {
  let keepSending = true;
  if (selectedGroupData.contactData.length === 0)
    return Alert.alert("Error", "Please add contacts to your group.");
  if (selectedGroupData.message === "")
    return Alert.alert("Error", "Please type a message");

  const formatContacts = (contactArray) => {
    const activeContacts = [];
    contactArray?.forEach((contact) => {
      if (contact.groupActive) {
        activeContacts.push(contact);
      } else {
        const groupIndex = findIndex(selectedGroupData, groupData);
        const contactIndex = findIndex(
          contact,
          groupData[groupIndex].contactData
        );
        groupData[groupIndex].contactData[contactIndex].status = "cancelled";
        setGroupData([...groupData]);
      }
    });
    return activeContacts;
  };
  const contacts = formatContacts(selectedGroupData.contactData);
  if (contacts.length === 0)
    return Alert.alert(
      "Error",
      "Please select some of the contacts from your group."
    );

  const formatMessage = (group, { name, firstName, lastName }) => {
    let newText = group.message.replace(/{fullName}/gi, name);
    if (firstName) {
      newText = newText.replace(/{firstName}/gi, firstName);
    } else {
      newText = newText.replace(/{firstName}/gi, "");
    }
    if (lastName) {
      newText = newText.replace(/{lastName}/gi, lastName);
    } else {
      newText = newText.replace(/{lastName}/gi, "");
    }
    if (group.eventInfo) {
      newText = newText.replace(/{groupInfo}/gi, group.eventInfo);
    } else {
      newText = newText.replace(/{groupInfo}/gi, "");
    }

    return newText;
  };
  //   formatMessage(groupData, groupData.contactData[0]);

  const handleSendMessage = async (contact, index, max, attachment) => {
    const message = formatMessage(selectedGroupData, contact);
    const phoneNumber = contact.activeNumber.digits;
    let result = undefined;
    if (attachment) {
      result = await SMS.sendSMSAsync(phoneNumber, message, {
        attachments: attachment,
      });
      result = result.result;
      contact.status = result;
      setGroupData([...groupData]);
    } else {
      result = await SMS.sendSMSAsync(phoneNumber, message);
      result = result.result;
      contact.status = result;
      setGroupData([...groupData]);
    }
    const groupIndex = findIndex(selectedGroupData, groupData);

    if (result == "cancelled" && index + 1 < max) {
      const choice = await AlertAsync(
        "Stop?",
        "Would you like to stop?",
        [
          { text: "Yes", onPress: () => "yes", style: "cancel" },
          { text: "No" },
        ],
        { cancelable: true, onDismiss: () => "no" }
      );
      if (choice === "yes") {
        keepSending = false;
      }
    } else if (result === "sent") {
      const contactIndex = findIndex(
        contact,
        groupData[groupIndex].contactData
      );
      groupData[groupIndex].contactData[contactIndex].status = result;
      setGroupData([...groupData]);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;
      groupData[groupIndex].lastSentMessage = today;
      setGroupData([...groupData]);
      await useStorage.storeData([...groupData]);
    }

    // console.log(result);
    // console.log(contact);
    await useStorage.storeData([...groupData]);

    return result;
  };
  let messagesSent = false;
  for (let index = 0; index < contacts.length; index++) {
    const contact = contacts[index];
    if (keepSending) {
      const result = await handleSendMessage(
        contact,
        index,
        contacts.length,
        attachment
      );
      // console.log(result);
      if (result === "sent") {
        messagesSent = true;
      }
    } else {
      contact.status = "cancelled";
      const groupIndex = findIndex(selectedGroupData, groupData);

      const contactIndex = findIndex(
        contact,
        groupData[groupIndex].contactData
      );
      groupData[groupIndex].contactData[contactIndex].status = "cancelled";
      setGroupData([...groupData]);
    }
  }
  return messagesSent;
};
