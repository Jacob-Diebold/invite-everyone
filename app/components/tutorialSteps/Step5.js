import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Text, Button, Divider } from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import ContactItem from "../contacts/ContactItem";
//THIS IS MY NEXT STEP, PUTTING THE ALL CONTACTS SCREEN ON THIS SCREEN

export default function Step5({ prevStep, nextStep, groupData, setGroupData }) {
  const [nextActive, setNextActive] = useState(false);

  const [contactData, setContactData] = useState([
    {
      active: false,
      activeNumber: {
        countryCode: "us",
        digits: "0000000000",
        id: "7151D566-942A-4506-99E3-C9A0B1D3BFB1",
        label: "mobile",
        number: "0000000000",
      },
      contactType: "person",
      firstName: "Lauren",
      groupActive: true,
      id: "AAC49EA4-59B5-4769-9485-7CAAD1073F41",
      imageAvailable: false,
      index: 0,
      lastName: "Doe",
      name: "Lauren Doe",
      phoneNumbers: [
        {
          countryCode: "us",
          digits: "1111111111",
          id: "7151D566-942A-4506-99E3-C9A0B1D3BFB1",
          label: "mobile",
          number: "1111111111",
        },
      ],
      status: null,
    },
    {
      active: false,
      activeNumber: false,
      contactType: "person",
      firstName: "Test",
      groupActive: false,
      id: "B5A71745-0CA9-44BC-A270-523D14774A63",

      imageAvailable: false,
      index: 1,
      lastName: "McTest",
      name: "Test McTest",
      phoneNumbers: [
        {
          countryCode: "us",
          digits: "2222222222",
          id: "4ACEACD1-8C3E-43C2-8D15-FC5408FA92E2",
          label: "mobile",
          number: "2222222222",
        },
        {
          countryCode: "us",
          digits: "3333333333",
          id: "2905342B-E491-44E1-98D8-6E74F606C111",
          label: "Home",
          number: "3333333333",
        },
      ],
      status: null,
    },
    {
      active: false,
      activeNumber: {
        countryCode: "us",
        digits: "1234567891",
        id: "7151D566-942A-4506-99E3-C9A0B1D3BFB0",
        label: "mobile",
        number: "1234567891",
      },
      contactType: "person",
      firstName: "John",
      groupActive: true,
      id: "AAC49EA4-59B5-4769-9485-7CAAD1073F40",
      imageAvailable: false,
      index: 2,
      lastName: "Doe",
      name: "John Doe",
      phoneNumbers: [
        {
          countryCode: "us",
          digits: "1234567891",
          id: "7151D566-942A-4506-99E3-C9A0B1D3BFB0",
          label: "mobile",
          number: "1234567891",
        },
      ],
      status: null,
    },
  ]);

  const renderItem = ({ item }) => {
    return (
      <ContactItem
        params={contactData}
        contact={item}
        handleMasterListUpdate={contactPressed}
        handleAddToContactList={() => null}
      />
    );
  };
  const separator = () => {
    return <Divider style={{ backgroundColor: colors.colors.primary[400] }} />;
  };

  const handleNext = () => {
    if (!contactData[0].active) return;
    if (!contactData[1].active) return;
    if (!contactData[2].active) return;
    groupData.contactData = contactData;
    setGroupData({ ...groupData });
    nextStep();
  };

  useEffect(() => {
    checkNext();
  }, [contactData]);
  const checkNext = () => {
    if (
      contactData[0].active &&
      contactData[1].active &&
      contactData[2].active
    ) {
      setNextActive(true);
    } else {
      setNextActive(false);
    }
  };

  const contactPressed = (contact) => {
    if (contact.active) {
      contactData[contact.index].active = false;
      setContactData([...contactData]);
    } else {
      contactData[contact.index].active = true;
      setContactData([...contactData]);

      // checkNext();
    }
  };
  const ListHeader = () => {
    return (
      <TutorialModal
        headerTitle={"Add Contacts"}
        prevStep={prevStep}
        nextStep={handleNext}
        nextActive={nextActive}
        style={{
          position: "relative",
          top: 0,
          marginTop: 30,
          height: 430,
          marginBottom: 40,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              This is part of the add contacts screen where you will add
              contacts to your group
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              Currently this is filled with some test contacts
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              When you use the app we will need permission to access your
              contacts and they will appear on this screen
            </Text>
          </MessageBox>
          <MessageBox>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              Please click on all of these contacts to add them to your group
              now! When they are all added press next.
            </Text>
          </MessageBox>
          <View style={{ height: 100 }} />
        </View>
      </TutorialModal>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.colors.primary[600],
        alignItems: "center",
      }}
    >
      <FlatList
        ListHeaderComponent={<ListHeader />}
        style={{ width: "100%" }}
        data={contactData}
        renderItem={renderItem}
        ItemSeparatorComponent={separator}
        keyExtractor={(item) => item.id + item.index}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
