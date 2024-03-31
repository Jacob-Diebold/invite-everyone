import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Text, Button, TextInput } from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import appStyles from "../../styles/appStyles";
import Section from "../Section";
import NavBar from "../../components/NavBar";
import findIndex from "../../hooks/findGroupIndex";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ModalContent from "../ModalContent";
import * as Haptics from "expo-haptics";
import * as SMS from "expo-sms";
// FOR THIS STEP I SHOULD DISABLE THE SEND BUTTON AND THEN PRESS NEXT STEP WHEN THE MESSAGE IS TYPED OUT. NEXT STEP WILL BE EXPLAINING HOW IT SENDS AND SENDING THE MESSAGE
export default function Step7({ prevStep, nextStep, groupData, setGroupData }) {
  const updateRef = useRef();
  const modalRef = useRef();

  const [update, setUpdate] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);
  const [nextActive, setNextActive] = useState(false);

  const [message, setMessage] = useState(groupData.message);
  const [messageSent, SetMessageSent] = useState(false);
  const updateScreen = async (listing, contact) => {
    setUpdate(contact);
    // updateRef.current.updateCard();
  };
  const [messageOkay, setMessageOkay] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [sendMessageReady, setSendMessageReady] = useState(false);

  const [step, setStep] = useState(0);
  const [nextScreen, setNextScreen] = useState(false);
  useEffect(() => {
    const showKeys = Keyboard.addListener("keyboardWillShow", (e) => {
      setKeyboardOpen(true);
    });
    const hideKeys = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardOpen(false);
    });
    return function cleanup() {
      showKeys.remove();
      hideKeys.remove();
    };
  });
  const handleFirst = () => {
    setMessage(message + "{firstName}");
    setMessageOkay(true);
  };
  const handleLast = () => {
    setMessage(message + "{lastName}");
    setMessageOkay(true);
  };
  const handleInfo = () => {
    setMessage(message + "{groupInfo}");
    setMessageOkay(true);
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

  const handleDataUpdate = async () => {
    groupData.message = message;
    setGroupData({ ...groupData });
  };

  const useMessage = async (selectedGroupData, groupData, setGroupData) => {
    let keepSending = true;

    const contacts = formatContacts(groupData.contactData);

    for (let index = 0; index < contacts.length; index++) {
      const contact = contacts[index];
      if (keepSending) {
        const result = await handleSendMessage(contact, index, contacts.length);
        console.log(result);
      } else {
        contact.status = "cancelled";

        const contactIndex = findIndex(contact, groupData.contactData);
        groupData.contactData[contactIndex].status = "cancelled";
        setGroupData({ ...groupData });
      }
    }
    SetMessageSent(true);
  };

  const formatContacts = (contactArray) => {
    const activeContacts = [];
    contactArray?.forEach((contact) => {
      if (contact.groupActive) {
        activeContacts.push(contact);
      } else {
        const contactIndex = findIndex(contact, groupData.contactData);
        groupData.contactData[contactIndex].status = "cancelled";
        setGroupData({ ...groupData });
      }
    });
    return activeContacts;
  };
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

  const handleSendMessage = async (contact, index, max) => {
    const message = formatMessage(groupData, contact);
    let phoneNumber = contact.activeNumber.digits;
    phoneNumber = "Test Number" + (index + 1);
    let result = undefined;
    result = await SMS.sendSMSAsync(phoneNumber, message);
    result = result.result;
    contact.status = result;
    setGroupData({ ...groupData });

    if (result == "cancelled" && index + 1 < max) {
      //   const choice = await AlertAsync(
      //     "Stop?",
      //     "Would you like to stop?",
      //     [
      //       { text: "Yes", onPress: () => "yes", style: "cancel" },
      //       { text: "No" },
      //     ],
      //     { cancelable: true, onDismiss: () => "no" }
      //   );
      //   if (choice === "yes") {
      //     keepSending = false;
      //   }
      const contactIndex = findIndex(contact, groupData.contactData);
      groupData.contactData[contactIndex].status = result;
      setGroupData({ ...groupData });
    } else if (result === "sent") {
      const contactIndex = findIndex(contact, groupData.contactData);
      groupData.contactData[contactIndex].status = result;
      setGroupData({ ...groupData });
    }

    return result;
  };
  const string = 'You should see "Hey {firstName}" in the input field.';

  const checkMessageOkay = (text) => {
    if (
      text.includes("{firstName}") ||
      text.includes("{lastName}") ||
      text.includes("{groupInfo}")
    ) {
      setMessageOkay(true);
      console.log("message okay");
    } else {
      setMessageOkay(false);
      console.log("message not okay");
    }
  };

  return (
    <BottomSheetModalProvider>
      <TouchableWithoutFeedback
        style={{}}
        disabled={!keyboardOpen}
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
          keyboardVerticalOffset={158}
        >
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: colors.colors.primary[600],
              alignItems: "center",
            }}
          >
            <>
              {step === 0 && (
                <TutorialModal
                  headerTitle={"Write Message"}
                  prevActive={false}
                  nextActive={messageOkay}
                  nextStep={() => {
                    setSendMessageReady(true);
                    nextStep();
                    setStep(1);
                  }}
                  showButtons={messageOkay}
                  style={{ position: "relative", top: 0, marginTop: 30 }}
                >
                  <View style={{ alignItems: "center" }}>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center", marginVertical: 5 }}
                      >
                        Now that you've updated the active contacts, you can
                        type up a message to send to everyone individually
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        When you click on the text input field, you will notice
                        a bar appear above your keyboard. This is the
                        Personalized Bar
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Pressing any of the buttons on the bar will input that
                        information in the message when a text gets sent out
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Type something like "Hey" and then press the First Name
                        button in the Personalized Bar
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        {string}
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        When you send this message to John it will show up as
                        "Hey John", but when you send it to Test it will show up
                        as "Hey Test"
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        When you send this message to John it will show up as
                        "Hey John", but when you send it to Test it will show up
                        as "Hey Test"
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        The next step button will appear when you use one of
                        these buttons. Press it!
                      </Text>
                    </MessageBox>
                    <View style={{ height: 100 }} />
                  </View>
                </TutorialModal>
              )}
              {step === 1 && (
                <TutorialModal
                  headerTitle={"Send Message"}
                  prevActive={false}
                  nextActive={nextScreen}
                  nextStep={() => {
                    nextStep();
                  }}
                  showButtons={nextScreen}
                  style={{ position: "relative", top: 0, marginTop: 30 }}
                >
                  <View style={{ alignItems: "center" }}>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center", marginVertical: 5 }}
                      >
                        Now the Send Message button has appeared at the bottom,
                        you can click this to send your message to all currently
                        active contacts
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        When the button is pressed a message pop up will appear
                        with your message written to your first contact
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Apple wants you to have control over who you send
                        messages to, so you must press the send button to each
                        person manually, this app can't do it automatically
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        When the pop up appears you can press the send button,
                        or cancel the message if you see a typo/ change your
                        mind. And then the next pop up will appear for your next
                        contact
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        You can press the send message button now. When the pop
                        up opens you can press cancel just for testings sake
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        You can move on to the next step now!
                      </Text>
                    </MessageBox>

                    <View style={{ height: 100 }} />
                  </View>
                </TutorialModal>
              )}
              <Section leftHeader="Message">
                <TextInput
                  multiline
                  label={"Text Message"}
                  style={[
                    styles.textInput,
                    {
                      backgroundColor: colors.colors.white,
                      width: "98%",
                      alignSelf: "center",
                      fontFamily: appStyles.text.fontFamily,
                      marginBottom: 30,
                      marginTop: 30,
                    },
                  ]}
                  onChangeText={(text) => {
                    setMessage(text);
                  }}
                  placeholder="Enter your text message here!"
                  onBlur={handleDataUpdate}
                  value={message}
                  mode="outlined"
                  outlineColor={colors.colors.lightGreen[400]}
                  activeOutlineColor={colors.colors.primary[400]}
                  onFocus={() => modalRef.current?.dismiss()}
                />
                {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
              height: 10,
            }}
          ></View> */}

                {sendMessageReady && (
                  <Button
                    disabled={false}
                    style={{
                      backgroundColor: colors.colors.primary[500],
                      width: "100%",
                      // left: "10%",
                      borderRadius: 1,
                      height: 60,
                      justifyContent: "center",
                      marginTop: 0,
                      // borderBottomWidth: 1,
                      borderWidth: 1,
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
                    onPress={() => {
                      modalRef.current?.dismiss();
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                      useMessage(groupData, groupData, setGroupData);
                      setNextScreen(true);
                      //   checkMessageOkay(message);
                    }}
                  >
                    Send Message to 2 Contacts
                  </Button>
                )}
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
            </>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <NavBar
        navBarHeight={50}
        handleFirst={handleFirst}
        handleLast={handleLast}
        handleInfo={handleInfo}
        showLeft={true}
        showMid={true}
        showRight={groupData.eventInfo && true}
      />
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
