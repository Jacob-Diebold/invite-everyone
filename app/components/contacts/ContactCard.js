import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { List, Divider, Avatar } from "react-native-paper";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import colors from "../../styles/colors";
import findIndex from "../../hooks/findGroupIndex";
import * as FileSystem from "expo-file-system";

const ContactCard = React.forwardRef(
  (
    {
      name,
      active,
      sent,
      updateContactActiveData,
      index,
      renderRightActions,
      contact,
      handleModal,
      selectedContact,
      divider,
      groupData,
      setGroupData,
      groupIndex,
      editContacts,
      handleDelete,
      tutorial,
    },
    ref
  ) => {
    const [sentDisplay, setSentDisplay] = useState(sent);
    const [contactActive, setContactActive] = useState(active);
    const [showActiveNumber, setShowActiveNumber] = useState("");
    // const [textColor, setTextColor] = useState("textColor1");

    // const [, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);
    // React.useImperativeHandle(ref.update, () => ({
    //   updateCard: () => {
    //     // forceUpdate();
    //     // console.log(selectedContact?.id)
    //     // console.log(contact?.id)
    //     // if (selectedContact?.id === contact?.id) {
    //     //   console.log("hello")
    //     //   setContactActive(true);
    //     //   // updateContactActiveData(true, index)
    //     //   forceUpdate();
    //     // }
    //   },
    // }));

    // useEffect(() => {
    //   if (contactActive) {
    //     setTextColor(colors.colors.success[600]);
    //   } else {
    //     setTextColor(colors.colors.danger[400]);
    //   }
    // }, [contactActive]);

    useEffect(() => {
      setSentDisplay(sent);
    }, [sent]);

    useEffect(() => {
      if (tutorial) return;

      if (contact.activeNumber) {
        setShowActiveNumber(contact.activeNumber.number);
      } else {
        setShowActiveNumber("No name");
      }
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;
      if (today != groupData[groupIndex].lastSentMessage) {
        // setSentDisplay(null)
        const contactIndex = findIndex(
          contact,
          groupData[groupIndex].contactData
        );
        groupData[groupIndex].contactData[contactIndex].status = null;
        setGroupData([...groupData]);
      }
    }, []);

    const handleSentDisplay = () => {
      if (sentDisplay === "sent") {
        return (
          <MaterialIcons
            style={styles.icon}
            name="send"
            size={20}
            color={colors.colors.success[600]}
          />
        );
      } else if (sentDisplay === "cancelled") {
        return (
          <MaterialIcons
            style={styles.icon}
            name="cancel-schedule-send"
            size={20}
            color={colors.colors.danger[200]}
          />
        );
      } else {
        return null;
      }
    };

    const handleTouch = () => {
      ref.modal.current?.dismiss();

      if (contactActive === true) {
        setContactActive(false);
        // setTextColor("red");
        updateContactActiveData(false, index);
      } else if (contact.activeNumber) {
        setContactActive(true);
        // setTextColor("green");
        updateContactActiveData(true, index);
      } else {
        handleModal(contact);
      }
    };
    // console.log(contact)
    const DeleteContact = () => {
      if (editContacts) {
        return (
          <TouchableOpacity
            onPress={handleDelete}
            style={{ alignSelf: "center", paddingRight: 10 }}
          >
            {/* <AntDesign
              name="minuscircle"
              size={35}
              color={colors.colors.danger[400]}
            /> */}
            <FontAwesome
              name="minus-circle"
              size={35}
              color={colors.colors.danger[400]}
            />
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    };
    const handleProfilePicture = (picture) => {
      const dir = FileSystem.cacheDirectory;
      const fileName = picture?.uri?.split("/Contacts")[1];
      const imageUri = dir + "Contacts" + fileName;
      const image = { uri: imageUri };
      return picture ? (
        <>
          <DeleteContact />
          <Avatar.Image size={35} source={image} />
        </>
      ) : (
        <>
          <DeleteContact />
          <Avatar.Icon
            size={35}
            icon="account"
            backgroundColor={colors.colors.secondary[400]}
          />
        </>
      );
    };

    return (
      // <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        {contactActive ? (
          <List.Item
            title={name ? name : showActiveNumber}
            titleStyle={{ color: colors.colors.success[500], marginLeft: 4 }}
            left={() => handleProfilePicture(contact.image)}
            right={handleSentDisplay}
            onPress={handleTouch}
            description={
              !contact.activeNumber &&
              "Multiple Numbers- Please click here to select one."
            }
            descriptionStyle={{
              color: "red",
              fontStyle: "italic",
              fontSize: 12,
            }}
            onLongPress={() => handleModal(contact)}
          />
        ) : (
          <List.Item
            title={name ? name : showActiveNumber}
            titleStyle={{ color: colors.colors.danger[200], marginLeft: 4 }}
            left={() => handleProfilePicture(contact.image)}
            right={handleSentDisplay}
            onPress={handleTouch}
            description={
              !contact.activeNumber &&
              "Multiple Numbers- Please click here to select one."
            }
            descriptionStyle={{
              color: "red",
              fontStyle: "italic",
              fontSize: 12,
            }}
            onLongPress={() => handleModal(contact)}
          />
        )}

        {divider && (
          <Divider
            style={{
              backgroundColor: colors.colors.dark[200],
              width: "95%",
              left: "0%",
            }}
          />
        )}
      </View>
      // </Swipeable>
    );
  }
);

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginRight: 10,
  },
  container: {
    justifyContent: "center",
  },
});

export default ContactCard;
