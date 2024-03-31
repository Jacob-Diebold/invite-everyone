import { SafeAreaView, StyleSheet, View } from "react-native";
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
} from "@gorhom/bottom-sheet";
import ModalContent from "../ModalContent";
import * as Haptics from "expo-haptics";

export default function Step8({ prevStep, nextStep, groupData, setGroupData }) {
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

  useEffect(() => {
    groupData.contactData[0].status = "sent";
    groupData.contactData[1].status = "cancelled";
    groupData.contactData[2].status = "sent";
  }, []);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.colors.primary[600],
          alignItems: "center",
        }}
      >
        <TutorialModal
          headerTitle={"Contacts Status"}
          prevActive={false}
          nextActive={true}
          nextStep={nextStep}
          prevStep={prevStep}
          showButtons={true}
          style={{
            position: "relative",
            top: 0,
            marginTop: 30,
            height: 315,
            marginBottom: 25,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <MessageBox>
              <Text
                variant="bodyMedium"
                style={{ marginVertical: 5, textAlign: "center" }}
              >
                After you send a message you you will see a status icon next to
                each contact
              </Text>
            </MessageBox>
            <MessageBox>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                This will let you know if you sent the message to this person,
                or if you cancelled/ skipped them for the most recent message
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
              handleModal={() => null}
              ref={{ update: updateRef, modal: modalRef }}
              selectedContact={update}
              editContacts={false}
              activeContactLength={activeContactLength}
              tutorial={true}
              sentCheck={() => null}
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
