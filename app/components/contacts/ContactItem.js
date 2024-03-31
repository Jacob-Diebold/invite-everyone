import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import useGroupData from "../../hooks/useGroupData";
import findIndex from "../../hooks/findGroupIndex";
import colors from "../../styles/colors";
export default function ContactItem({
  contact,
  handleMasterListUpdate,
  params,
  handleAddToContactList,
}) {
  const { groupData, setGroupData } = useGroupData();
  const [checked, setChecked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    colors.colors.background
  );

  useEffect(() => {
    if (contact.active) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  useEffect(() => {
    if (checked) {
      setBackgroundColor(colors.colors.success[200]);
    } else {
      setBackgroundColor(colors.colors.background);
    }
  }, [checked]);

  const CheckIcon = ({ checked, style }) => {
    if (checked) {
      return (
        <Ionicons
          style={[styles.icon, style]}
          name="ios-radio-button-on"
          size={24}
          color={colors.colors.success[600]}
        />
      );
    } else {
      return (
        <Ionicons
          style={[styles.icon, style]}
          name="ios-radio-button-off"
          size={24}
          color={colors.colors.dark[800]}
        />
      );
    }
  };

  const handleTouch = async (item) => {
    const groupIndex = findIndex(params, groupData);
    if (checked === true) {
      setChecked(false);
      handleMasterListUpdate(contact, contact.index, false);
      // const contactList = groupData[groupIndex].contactData;
      // const foundContact = contactList.find((item) => item.id === contact.id);
      // const index = contactList.indexOf(foundContact);
      // // console.log(foundContact)
      // contactList.splice(index, 1);
      // setGroupData([...groupData]);
      handleAddToContactList(contact, true);
    } else {
      setChecked(true);
      handleMasterListUpdate(contact, contact.index, true);
      handleAddToContactList(contact, false);
      // const contactList = groupData[groupIndex].contactData;
      // if (contact.phoneNumbers.length === 1) {
      //   contact.activeNumber = contact.phoneNumbers[0];
      // } else {
      //   contact.activeNumber = false;
      //   contact.groupActive = false;
      // }
      // if (contactList.indexOf(contact) === -1) {
      //   setGroupData(
      //     [...groupData],
      //     groupData[groupIndex].contactData.push(contact)
      //   );
      // } else {
      //   console.log("Contact already Added");
      // }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: backgroundColor }]}
      // style={[styles.container, {backgroundColor:{checked? "red" : "blue"}}]}
      onPress={handleTouch}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <CheckIcon checked={checked} style={styles.icon} /> */}
        <View>
          <Text>
            {contact.name ? contact.name : contact.phoneNumbers[0].number}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colors.singletons.white,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: 60,
    paddingLeft: 20,
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
