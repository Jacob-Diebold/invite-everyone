import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Text } from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import Section from "../Section";
import GroupContacts from "../contacts/GroupContacts";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import ModalContent from "../ModalContent";
import * as Haptics from "expo-haptics";

export default function Step6({ prevStep, nextStep, groupData, setGroupData }) {
  const updateRef = useRef();
  const modalRef = useRef();

  const [update, setUpdate] = useState(null);
  const [editContacts, setEditContacts] = useState(false);
  const [contactsLength, setContactsLength] = useState(0);
  const [contactButtonColor, setContactButtonColor] = useState(
    colors.colors.primary[500]
  );
  const [selectedContact, setSelectedContact] = useState(null);
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);
  const [nextActive, setNextActive] = useState(false);
  const activeContactLength = (length) => {
    setContactsLength(length);
  };

  const updateScreen = async (listing, contact) => {
    setUpdate(contact);
    // updateRef.current.updateCard();
  };
  //   const setEditState = (state) => {
  //     // console.log(state)

  //     if (state === true || state === false) {
  //       setEditContacts(state);
  //       if (state === true) {
  //         setContactButtonColor(colors.colors.danger[400]);
  //       } else if (state === false) {
  //         setContactButtonColor(colors.colors.primary[500]);
  //       }
  //     } else {
  //       if (editContacts === false) {
  //         setEditContacts(true);
  //         setContactButtonColor(colors.colors.danger[400]);
  //       } else {
  //         setEditContacts(false);
  //         setContactButtonColor(colors.colors.primary[500]);
  //       }
  //     }
  //   };

  const openModal = (contact) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.log(error);
    }
    if (contact.id != undefined) {
      setSelectedContact(contact);
    }
    modalRef.current?.present();
  };
  const sentCheck = (response) => {
    console.log("Response:", response);
    console.log(groupData.contactData[0].groupActive);
  };
  const checkNext = () => {
    if (
      groupData.contactData[0].groupActive &&
      !groupData.contactData[1].groupActive &&
      groupData.contactData[2].groupActive
    ) {
      setNextActive(true);
    } else {
      setNextActive(false);
    }
  };

  useEffect(() => {
    checkNext();
  }, [groupData]);
  const handleNext = () => {
    console.log(groupData);
    if (
      groupData.contactData[0].groupActive &&
      !groupData.contactData[1].groupActive &&
      groupData.contactData[2].groupActive
    ) {
      nextStep();
    }
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.colors.primary[600],
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.colors.primary[600],
            alignItems: "center",
          }}
        >
          <TutorialModal
            headerTitle={"Contacts Section"}
            prevActive={false}
            nextActive={nextActive}
            nextStep={handleNext}
            showButtons={nextActive}
            style={{ position: "relative", top: 0, marginTop: 30 }}
          >
            <View style={{ alignItems: "center" }}>
              <MessageBox>
                <Text
                  variant="bodyMedium"
                  style={{ textAlign: "center", marginVertical: 5 }}
                >
                  Now you have some contacts in your group
                </Text>
              </MessageBox>
              <MessageBox>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  'Test McTest' has multiple phone numbers saved, click on his
                  contact to show them and then click on a number to select one
                  (for this test it doesn't matter which one)
                </Text>
              </MessageBox>
              <MessageBox>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  If you ever want to check a contact's phone number or change
                  it, just hold on the contact
                </Text>
              </MessageBox>
              <MessageBox>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  When you send a message to your group, it will send it to all
                  active contacts (green)
                </Text>
              </MessageBox>
              <MessageBox>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  If you want to skip a contact for this message but keep them
                  in the group, click on the contact to deactivate them (red)
                </Text>
              </MessageBox>
              <MessageBox>
                <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                  For this tutorial set John and Test to active, and Lauren to
                  Inactive. Press next when you're ready!
                </Text>
              </MessageBox>
              <View style={{ height: 100 }} />
            </View>
          </TutorialModal>
          <Section
            leftHeader="Group Contacts"
            style={{ marginBottom: 0, marginTop: 10 }}
            headerStyle={{ height: 50 }}
          >
            <>
              <GroupContacts
                style={{ marginTop: 10 }}
                params={groupData}
                contactData={groupData.contactData}
                handleModal={openModal}
                ref={{ update: updateRef, modal: modalRef }}
                selectedContact={update}
                editContacts={editContacts}
                activeContactLength={activeContactLength}
                tutorial={true}
                sentCheck={checkNext}
              />
            </>
          </Section>
          <BottomSheetModal
            backgroundStyle={{ backgroundColor: "lightgrey" }}
            ref={modalRef}
            snapPoints={snapPoints}
          >
            <ModalContent
              contact={selectedContact}
              updateScreen={updateScreen}
              ref={modalRef}
              tutorial={true}
            />
          </BottomSheetModal>
        </SafeAreaView>
      </ScrollView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  textInput: {
    // height: 150,
    textAlign: "justify",
    textAlignVertical: "top",
    borderRadius: 10,
    maxHeight: 200,
    // marginVertical: 10,
    marginTop: 25 - 6,
    marginBottom: 10,
  },
  avatar: {
    marginTop: 10,
    marginBottom: 10,
  },
  groupSection: {
    // left: 10,
  },
  groupHeader: {
    flexDirection: "row",
    alignContent: "center",
    flex: 1,
    // backgroundColor: "red",
    // marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contactButton: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
  },
  divider: {
    marginTop: 10,
    backgroundColor: colors.colors.dark[300],
  },
});
