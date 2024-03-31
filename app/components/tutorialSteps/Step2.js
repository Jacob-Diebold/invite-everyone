import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import {
  Text,
  Divider,
  TextInput,
  HelperText,
  Button,
} from "react-native-paper";
import TutorialModal from "./TutorialModal";
import MessageBox from "../MessageBox";
import colors from "../../styles/colors";
import appStyles from "../../styles/appStyles";
import getColor from "../../hooks/getColor";
import AvatarHandler from "../AvatarHandler";
import pickImage from "../../hooks/pickImage";

export default function Step2({ nextStep, prevStep, step, setTutorialGroup }) {
  const [nameFilled, setNameFilled] = useState(false);
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [groupInitials, setGroupInitials] = useState();
  const [imageUri, setImageUri] = useState();
  const [visible, setVisible] = useState(false);
  const [groupColor, setGroupColor] = useState(colors.colors.primary);

  const handleNext = () => {
    if (step === 2 && nameFilled) {
      nextStep();
    }
  };
  const requiredName = (name) => {
    if (name) {
      setNameFilled(true);
    } else {
      setNameFilled(false);
    }
  };

  useEffect(() => {
    if (groupName) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    if (requiredName) {
      requiredName(groupName);
    }
  }, [groupName]);
  useEffect(() => {
    const myColor = getColor();
    setGroupColor(myColor);
  }, []);

  const getInitials = () => {
    const stringArray = groupName?.toUpperCase().trim().split(" ");
    try {
      switch (stringArray.length) {
        case 0:
          setGroupInitials("");
          break;
        case 1:
          const initial = stringArray[0][0];
          setGroupInitials(initial);
          break;

        default:
          const one = stringArray[0][0];
          const two = stringArray[1][0];
          setGroupInitials(one + two);
          break;
      }
    } catch (error) {}
  };

  const handleAddImage = async () => {
    const image = await pickImage.pickImage(imageUri);
    setImageUri(image);
  };
  const submitGroup = async () => {
    if (!groupName) return;
    const newGroup = {
      image: imageUri,
      title: groupName,
      initials: groupInitials,
      eventInfo: groupDescription,
      lastSentMessage: "",
      message: "",
      contactData: [],
      groupColor: groupColor,
      messageAttachment: undefined,
    };
    setTutorialGroup(newGroup);
    nextStep();
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={92}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.colors.primary[600] }}
      >
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={{ flex: 1, backgroundColor: colors.colors.primary[600] }}
          activeOpacity={1}
        >
          <SafeAreaView style={{ alignItems: "center" }}>
            {step === 2 && (
              <>
                <TutorialModal
                  headerTitle="Group Information"
                  style={{
                    position: "relative",
                    top: 5,
                    height: 425,
                    marginBottom: 50,
                  }}
                  nextStep={handleNext}
                  prevStep={prevStep}
                  nextActive={nameFilled}
                >
                  <View style={{ alignItems: "center" }}>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        This is part of the create a group page
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Input the name of your group now! (This is just a test
                        group that will be deleted at the end of the tutorial,
                        so the name doesn't matter for this)
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Optionally you can input any info to be connected to
                        your group in group info. (ex: event time, place, a
                        note)
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Press next when you're done
                      </Text>
                    </MessageBox>
                  </View>
                </TutorialModal>
                <View
                  style={{
                    width: "98%",
                    borderRadius: 5,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.colors.lightGreen[50],
                      height: 50,

                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: appStyles.text.headerSize,
                        color: appStyles.text.color,
                        fontFamily: appStyles.text.fontFamily,
                        fontWeight: appStyles.text.headerWeight,
                        alignSelf: "center",
                      }}
                    >
                      Group Info
                    </Text>
                  </View>
                  <Divider
                    style={{
                      backgroundColor: colors.colors.dark[100],
                      width: "100%",
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: colors.colors.singletons.white,
                    }}
                  >
                    <View style={{ alignContent: "center" }}>
                      <TextInput
                        label="Group Name"
                        mode="outlined"
                        style={[styles.textInput, { marginTop: 20 }]}
                        onChangeText={(text) => setGroupName(text)}
                        onChange={getInitials}
                        autoCapitalize="words"
                        outlineColor={colors.colors.lightGreen[400]}
                        activeOutlineColor={colors.colors.primary[400]}
                        value={groupName}
                      />
                      <View style={{ height: 30 }}>
                        <HelperText
                          type="error"
                          style={{
                            alignSelf: "flex-start",
                            color: colors.colors.danger[400],
                          }}
                          visible={visible}
                        >
                          Group Name is required
                        </HelperText>
                      </View>
                      <TextInput
                        label="Group Info"
                        mode="outlined"
                        style={[styles.textInput, { marginBottom: 20 }]}
                        placeholder="ex: event time, place, note"
                        onChangeText={(text) => setGroupDescription(text)}
                        outlineColor={colors.colors.lightGreen[400]}
                        activeOutlineColor={colors.colors.primary[400]}
                        value={groupDescription}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
            {step === 3 && (
              <>
                <TutorialModal
                  headerTitle="Group Picture / Submit"
                  style={{
                    position: "relative",
                    top: 5,
                    height: 375,
                    marginBottom: 50,
                  }}
                  nextStep={handleNext}
                  prevStep={prevStep}
                  nextActive={false}
                >
                  <View style={{ alignItems: "center" }}>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Click on the icon to add a picture thats saved on your
                        phone!
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Select the wrong picture? No problem, click on it again
                        to change it or delete it entirely
                      </Text>
                    </MessageBox>
                    <MessageBox>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: "center" }}
                      >
                        Press the Submit button to save your first group!
                      </Text>
                    </MessageBox>
                  </View>
                </TutorialModal>
                <View
                  style={{
                    width: "98%",
                    borderRadius: 5,
                    overflow: "hidden",
                    // marginTop: 20,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: colors.colors.lightGreen[50],
                      height: 50,

                      flexDirection: "row",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: appStyles.text.headerSize,
                        color: appStyles.text.color,
                        fontFamily: appStyles.text.fontFamily,
                        fontWeight: appStyles.text.headerWeight,
                        alignSelf: "center",
                      }}
                    >
                      Add a Group Picture
                    </Text>
                  </View>
                  <Divider
                    style={{
                      backgroundColor: colors.colors.dark[100],
                      width: "100%",
                    }}
                  />
                  <View
                    style={{ backgroundColor: colors.colors.singletons.white }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      
                      <View
                        // style={{backgroundColor:"red"}}
                        style={{ marginTop: 15, marginBottom: 10 }}
                      >
                        <TouchableOpacity onPress={handleAddImage}>
                          <AvatarHandler
                            groupInitials={groupInitials}
                            editing={true}
                            image={imageUri}
                            groupColor={groupColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Button
                      mode="contained"
                      onPress={submitGroup}
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
                        borderBottomStartRadius: 5,
                        borderBottomEndRadius: 5,
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
                    >
                      Submit
                    </Button>
                  </View>
                </View>
              </>
            )}
          </SafeAreaView>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.colors.background,
  },
  bar: {
    justifyContent: "center",
  },
  headerText: {
    fontSize: appStyles.text.headerSize,
    fontFamily: appStyles.text.fontFamily,
    fontWeight: appStyles.text.headerWeight,
  },
  divider: {
    marginBottom: 20,
    backgroundColor: colors.colors.dark[400],
  },
  formContainer: {
    alignItems: "center",
  },
  textInput: {
    textAlign: "justify",
    textAlignVertical: "top",
    borderRadius: 25,
    width: "95%",
    alignSelf: "center",
  },

  eventButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  submit: {
    marginTop: 20,
  },

  buttonText: {
    fontFamily: appStyles.text.fontFamily,
  },
});
