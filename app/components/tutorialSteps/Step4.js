import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useRef, useState } from "react";
import { Text, Button } from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import appStyles from "../../styles/appStyles";
import Section from "../Section";
import GroupContacts from "../contacts/GroupContacts";

export default function Step4({ prevStep, nextStep, groupData }) {
  const updateRef = useRef();
  const modalRef = useRef();

  const [update, setUpdate] = useState(null);
  const [editContacts, setEditContacts] = useState(false);
  const [contactsLength, setContactsLength] = useState(0);

  const activeContactLength = (length) => {
    setContactsLength(length);
  };
  const rightHeader = () => {
    return (
      <Button
        textColor={colors.colors.primary[500]}
        mode="text"
        title="Contacts"
        onPress={() => {
          modalRef.current?.dismiss();
          nextStep();
          //   navigation.navigate(routes.ADD_CONTACTS, route.params);
        }}
        labelStyle={{ fontFamily: appStyles.text.fontFamily }}
      >
        Add Contacts
      </Button>
    );
  };
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.colors.primary[600],
        alignItems: "center",
      }}
    >
      <ScrollView>
        <TutorialModal
          headerTitle={"Contacts Section"}
          prevStep={prevStep}
          nextActive={false}
          style={{ position: "relative", top: 0, marginTop: 30, height: 425 }}
        >
          <View style={{ alignItems: "center" }}>
            <MessageBox>
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", marginVertical: 5 }}
              >
                This is what the contacts section of a group page looks like
              </Text>
            </MessageBox>
            <MessageBox>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                When you add contacts to a group, they will pop up here
              </Text>
            </MessageBox>
            <MessageBox>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                For this tutorial we won't load your actual contacts, we will
                use some fake contacts
              </Text>
            </MessageBox>
            <MessageBox>
              <Text variant="bodyMedium" style={{ textAlign: "center" }}>
                Click the Add Contacts button to start selecting contacts!
              </Text>
            </MessageBox>
          </View>
        </TutorialModal>
        <Section
          leftHeader="Group Contacts"
          renderRightHeader={rightHeader}
          style={{ marginBottom: 30, marginTop: 50 }}
          headerStyle={{ height: 50 }}
        >
          <>
            {groupData.contactData.length === 0 && (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  fontSize={16}
                  style={{
                    fontFamily: appStyles.text.fontFamily,
                    alignSelf: "center",
                    marginHorizontal: 15,
                  }}
                >
                  Add some contacts to this group and they will show up here!
                </Text>
              </View>
            )}
            {/* {!isFocused && (
                    <GroupContacts
                      style={{ marginTop: 10 }}
                      params={route.params}
                      contactData={route.params.contactData}
                      handleModal={openModal}
                      ref={{ update: updateRef, modal: modalRef }}
                      selectedContact={update}
                      editContacts={editContacts}
                      activeContactLength={activeContactLength}
                    />
                  )} */}

            <GroupContacts
              style={{ marginTop: 10 }}
              params={groupData}
              contactData={groupData.contactData}
              handleModal={openModal}
              ref={{ update: updateRef, modal: modalRef }}
              selectedContact={update}
              editContacts={editContacts}
              // turnOffEditButton={turnOffEditButton}
              activeContactLength={activeContactLength}
            />

            {groupData.contactData.length > 0 && (
              <>
                <Divider style={styles.divider} />

                <Button
                  style={{
                    backgroundColor: contactButtonColor,
                    width: "100%",
                    // left: "10%",
                    borderRadius: 1,
                    height: 50,
                    justifyContent: "center",
                    marginTop: 0,
                    // borderBottomWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor: colors.colors.primary[700],
                    // borderLeftWidth: 1,
                    // borderRightWidth: 1,
                    borderBottomStartRadius: 8,
                    borderBottomEndRadius: 8,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    borderRadius: 0,
                    fontFamily: appStyles.text.fontFamily,
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 0,
                  }}
                  mode="contained"
                  onPress={setEditState}
                >
                  Edit Contacts
                </Button>
              </>
            )}
          </>
        </Section>
      </ScrollView>
    </SafeAreaView>
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
