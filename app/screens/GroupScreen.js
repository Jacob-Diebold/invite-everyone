import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  ScrollView,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import {
  TextInput,
  Avatar,
  Button,
  Divider,
  ProgressBar,
  ActivityIndicator,
} from "react-native-paper";
import GroupContacts from "../components/contacts/GroupContacts";
import routes from "../hooks/navigation/routes";
import useGroupData from "../hooks/useGroupData";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import ModalContent from "../components/ModalContent";
import * as Haptics from "expo-haptics";
import useMessage from "../hooks/message/useMessage";
import NavBar from "../components/NavBar";
import findIndex from "../hooks/findGroupIndex";
import useStorage from "../hooks/useStorage";
import colors from "../styles/colors";
import appStyles from "../styles/appStyles";
import Section from "../components/Section";
import ImageHandler from "../components/ImageHandler";
import useAttachment from "../components/useAttachment";
import pickImage from "../hooks/pickImage";
import { useIsFocused } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import useMessageCount from "../hooks/useMessageCount";
import useReview from "../hooks/useReview";

export default function GroupScreen({ route, navigation }) {
  const { groupData, setGroupData } = useGroupData();
  const groupIndex = findIndex(route.params, groupData);
  const [message, setMessage] = useState(groupData[groupIndex].message);
  const [selectedContact, setSelectedContact] = useState(null);
  const [update, setUpdate] = useState(null);
  const [messageAttachment, setMessageAttachment] = useState(
    groupData[groupIndex].messageAttachment
  );
  const [displayAttachment, setDisplayAttachment] = useState();
  const [editContacts, setEditContacts] = useState(false);
  const [contactButtonColor, setContactButtonColor] = useState(
    colors.colors.primary[500]
  );
  const [refreshing, setRefreshing] = useState(false);
  const [contactsLength, setContactsLength] = useState(0);
  const isFocused = useIsFocused();

  const modalRef = useRef();
  const updateRef = useRef();

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
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(() => {
    setEditState(false);
    setRefreshing(true);
    wait(0).then(() => setRefreshing(false));
  }, []);

  const snapPoints = useMemo(() => ["25%", "50%"], []);
  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
      headerShown: true,
      headerTitleStyle: {
        fontFamily: appStyles.text.fontFamily,
        color: appStyles.text.color,
        fontWeight: appStyles.text.navWeight,
        backgroundColor: "black",
      },

      // headerRight: () => {
      //   return (
      //     <Button
      //       title="Edit"
      //       color={colors.colors.secondary[400]}
      //       onPress={setEditState}
      //     >Hi</Button>
      //   );
      // },
    });
    isFocused;
  }, []);

  const handleDataUpdate = async () => {
    setGroupData([...groupData], (groupData[groupIndex].message = message));
    await useStorage.storeData(
      [...groupData],
      (groupData[groupIndex].message = message)
    );
  };

  const updateScreen = async (listing, contact) => {
    setUpdate(contact);

    // updateRef.current.updateCard();
  };

  const handleFirst = () => {
    setMessage(message + "{firstName}");
  };
  const handleLast = () => {
    setMessage(message + "{lastName}");
  };
  const handleInfo = () => {
    setMessage(message + "{groupInfo}");
  };

  const rightHeader = () => {
    return (
      <Button
        textColor={colors.colors.primary[500]}
        mode="text"
        title="Contacts"
        onPress={() => {
          modalRef.current?.dismiss();
          navigation.navigate(routes.ADD_CONTACTS, route.params);
        }}
        labelStyle={{ fontFamily: appStyles.text.fontFamily }}
      >
        Add Contacts
      </Button>
    );
  };

  const handleAddAttachment = async () => {
    modalRef.current?.dismiss();
    const rawImage = await pickImage.pickImage(messageAttachment);
    groupData[groupIndex].messageAttachment = rawImage;
    setMessageAttachment(rawImage);
    await useStorage.storeData(
      [...groupData],
      (groupData[groupIndex].messageAttachment = rawImage)
    );
  };

  useEffect(() => {
    const dir = FileSystem.cacheDirectory;
    const fileName = messageAttachment?.uri?.split("/ImagePicker")[1];
    const image = dir + "ImagePicker" + fileName;
    setDisplayAttachment(image);
  }, [messageAttachment]);
  const setEditState = (state) => {
    // console.log(state)

    if (state === true || state === false) {
      setEditContacts(state);
      if (state === true) {
        setContactButtonColor(colors.colors.danger[400]);
      } else if (state === false) {
        setContactButtonColor(colors.colors.primary[500]);
      }
    } else {
      if (editContacts === false) {
        setEditContacts(true);
        setContactButtonColor(colors.colors.danger[400]);
      } else {
        setEditContacts(false);
        setContactButtonColor(colors.colors.primary[500]);
      }
    }
  };
  const turnOffEditButton = () => {
    console.log("edit button");
    if (route.params.contactData.length === 1) {
      console.log("turn off!");
      setEditContacts(false);
      setContactButtonColor(colors.colors.primary[500]);
    }
  };

  useEffect(() => {
    setEditState(false);
    onRefresh();
  }, [isFocused]);

  const activeContactLength = (length) => {
    setContactsLength(length);
  };
  return (
    <BottomSheetModalProvider>
      <View style={{ backgroundColor: colors.colors.primary[400], flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            modalRef.current?.dismiss();
          }}
        >
          <ImageBackground
            style={{ flex: 1 }}
            source={appStyles.background.default}
          >
            <ScrollView
              style={{
                flex: 1,
                alignContent: "center",
              }}
              // refreshControl={
              //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              // }
            >
              {route.params.image ? (
                <ImageHandler image={route.params.image} />
              ) : (
                /* <Avatar.Image
              alignSelf="center"
              size={125}
              // bg="amber.500"
              style={styles.avatar}
              source={{ uri: route.params?.uri }}
              backgroundColor={groupData[groupIndex].groupColor}
            >
            </Avatar.Image> */
                <Avatar.Text
                  alignSelf="center"
                  size={125}
                  style={styles.avatar}
                  label={route.params.initials}
                  backgroundColor={route.params.groupColor}
                />
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
                    },
                  ]}
                  onChangeText={(text) => setMessage(text)}
                  placeholder="Enter your text message here!"
                  onBlur={handleDataUpdate}
                  value={message}
                  mode="outlined"
                  outlineColor={colors.colors.lightGreen[400]}
                  activeOutlineColor={colors.colors.primary[400]}
                  onFocus={() => modalRef.current?.dismiss()}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    marginTop: 10,
                    height: 50,
                  }}
                >
                  {messageAttachment && (
                    <Image
                      source={{ uri: displayAttachment }}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "red",
                        position: "absolute",
                        left: 20,
                        resizeMode: "stretch",
                      }}
                    />
                  )}
                  {messageAttachment ? (
                    <Button
                      labelStyle={{ color: colors.colors.primary[500] }}
                      onPress={handleAddAttachment}
                      // style={{ marginBottom: 10 }}
                    >
                      Picture Attached to Message
                    </Button>
                  ) : (
                    <Button
                      labelStyle={{ color: colors.colors.primary[500] }}
                      onPress={handleAddAttachment}
                    >
                      Add Picture to Message
                    </Button>
                  )}
                </View>

                <Button
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
                  onPress={async () => {
                    modalRef.current?.dismiss();

                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    let messageResult = null;
                    try {
                      if (messageAttachment) {
                        const payload = useAttachment(messageAttachment);
                        messageResult = await useMessage(
                          groupData[groupIndex],
                          groupData,
                          setGroupData,
                          payload
                        );
                      } else {
                        messageResult = await useMessage(
                          groupData[groupIndex],
                          groupData,
                          setGroupData
                        );
                      }
                    } catch (error) {
                      console.log(error);
                    }
                    if (contactsLength > 0) {
                      //Write any code here to execute after the messages have finished sending
                      if (messageResult) {
                        const prevCount =
                          await useMessageCount.checkMessageCount();
                        useMessageCount.addToMessageCount();
                        const count = prevCount + 1;
                        if (count != null && count % 3 === 0) {
                          useReview.showReview();
                          console.log("Review screen requested");
                        }
                      }
                    }
                  }}
                >
                  Send Message to {contactsLength} Contacts
                </Button>
              </Section>

              <Section
                leftHeader="Group Contacts"
                renderRightHeader={rightHeader}
                style={{ marginBottom: 30, marginTop: 50 }}
              >
                <>
                  {route.params.contactData.length === 0 && (
                    <View
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        marginVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: appStyles.text.fontFamily,
                          alignSelf: "center",
                          marginHorizontal: 15,
                          fontSize: 16,
                        }}
                      >
                        Add some contacts to this group and they will show up
                        here!
                      </Text>
                    </View>
                  )}
                  {!isFocused && (
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
                  )}
                  {isFocused && (
                    <GroupContacts
                      style={{ marginTop: 10 }}
                      params={route.params}
                      contactData={route.params.contactData}
                      handleModal={openModal}
                      ref={{ update: updateRef, modal: modalRef }}
                      selectedContact={update}
                      editContacts={editContacts}
                      turnOffEditButton={turnOffEditButton}
                      activeContactLength={activeContactLength}
                    />
                  )}

                  {/* {refreshing && route.params.contactData.length > 0 && (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 100,
                        flex: 1,
                      }}
                    >
                      <ActivityIndicator
                        color={colors.colors.primary[500]}
                        size="large"
                      />
                    </View>
                  )} */}

                  {route.params.contactData.length > 0 && (
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

              <BottomSheetModal
                backgroundStyle={{ backgroundColor: "lightgrey" }}
                ref={modalRef}
                snapPoints={snapPoints}
              >
                <ModalContent
                  contact={selectedContact}
                  updateScreen={updateScreen}
                  ref={modalRef}
                />
              </BottomSheetModal>
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
        <NavBar
          navBarHeight={50}
          handleFirst={handleFirst}
          handleLast={handleLast}
          handleInfo={handleInfo}
          showLeft={true}
          showMid={true}
          showRight={groupData[groupIndex].eventInfo && true}
        />
      </View>
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
