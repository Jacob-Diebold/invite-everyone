import React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import formatPhone from "../hooks/contacts/formatPhone";
import useStorage from "../hooks/useStorage";
import useGroupData from "../hooks/useGroupData";
const ModalContent = ({ contact, updateScreen, tutorial = false }, ref) => {
  const { groupData } = useGroupData();
  const phoneNumbers = contact.phoneNumbers;
  //   console.log(contact);
  const handlePress = async (phoneListing, contact) => {
    contact.activeNumber = phoneListing;
    contact.groupActive = true;
    updateScreen(phoneListing, contact);
    ref.current?.dismiss();
    if (tutorial) return;
    await useStorage.storeData(groupData);
  };

  return (
    <View>
      {phoneNumbers.map((phoneListing, index) => {
        const formatted = formatPhone(phoneListing.label, phoneListing.digits);

        return (
          <List.Item
            title={formatted.display}
            key={contact.id + index}
            onPress={() => handlePress(phoneListing, contact)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default React.forwardRef(ModalContent);
