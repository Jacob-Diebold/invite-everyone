import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import {
  Divider,
  Appbar,
  TextInput,
  Button,
  HelperText,
} from "react-native-paper";
import AvatarHandler from "../components/AvatarHandler";
import pickImage from "../hooks/pickImage";
import useGroupData from "../hooks/useGroupData";
import useStorage from "../hooks/useStorage";
import getColor from "../hooks/getColor";
import colors from "../styles/colors";
import appStyles from "../styles/appStyles";

export default function CreateGroup({ handleModal, closeModal }) {
  const [groupName, setGroupName] = useState();
  const [groupDescription, setGroupDescription] = useState();
  const [groupInitials, setGroupInitials] = useState();
  const [date, setDate] = useState(new Date());
  const [groupImage, setGroupImage] = useState();
  const { groupData, setGroupData } = useGroupData();
  const [visible, setVisible] = useState(false);
  const [groupColor, setGroupColor] = useState(colors.colors.primary);
  useEffect(() => {
    if (groupName) {
      setVisible(false);
    } else {
      setVisible(true);
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
    const image = await pickImage.pickImage(groupImage);
    setGroupImage(image);
  };
  const submitGroup = async () => {
    if (!groupName) return;
    const newGroup = {
      image: groupImage,
      title: groupName,
      initials: groupInitials,
      eventInfo: groupDescription,
      lastSentMessage: "",
      // groupIndex: groupData.length,
      message: "",
      contactData: [],
      groupColor: groupColor,
      messageAttachment: undefined,
    };
    // console.log([...groupData, newGroup]);
    await useStorage.storeData([...groupData, newGroup]);
    setGroupData([...groupData, newGroup]);
    console.log("stored");
    closeModal();
  };
  return (
    <View style={[styles.container, { overflow: "visible" }]}>
      <ImageBackground
        style={{ flex: 1 }}
        source={appStyles.background.default}
      >
        <Appbar.Header style={[styles.bar, { backgroundColor: "transparent" }]}>
          <Appbar.BackAction
            onPress={handleModal}
            style={styles.back}
            size={18}
          />
          <Appbar.Content
            title="Create a new group"
            titleStyle={styles.headerText}
          />
        </Appbar.Header>
        <Divider style={styles.divider} />

        <View style={styles.formContainer}>
          {/* <Button
          mode="contained"
          onPress={() => setGroupColor(getColor())}
          style={{ backgroundColor: colors.colors.secondary[300], marginBottom: 30 }}
          labelStyle={styles.buttonText}
        >
          New Color
        </Button> */}

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
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: "98%",
              borderRadius: 5,
              overflow: "hidden",
              marginTop: 20,
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
            <View style={{ backgroundColor: colors.colors.singletons.white }}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                {/* <Text style={{ fontFamily: appStyles.text.fontFamily }}>
                Add a group picture
              </Text> */}
                {/* <Text
                  style={{
                    fontFamily: appStyles.text.fontFamily,
                    marginTop: 15,
                  }}
                >
                  You can even select a gif from your photos!
                </Text> */}
                <View
                  // style={{backgroundColor:"red"}}
                  style={{ marginTop: 15, marginBottom: 10 }}
                >
                  <TouchableOpacity onPress={handleAddImage}>
                    <AvatarHandler
                      groupInitials={groupInitials}
                      editing={true}
                      image={groupImage}
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

          {/* Date time picker in case i want to add it in the future */}
          {/* <View style={styles.picker}>
          <Text variant="titleMedium" style={{ fontWeight: "400" }}>
            Event Info
          </Text>
          <View style={styles.pickerContainer}>
            <DateTimePicker onChange={(e,date)=>setDate(date)} value={date} mode="datetime" style={styles.date} />
          </View>
        </View> */}
        </View>
      </ImageBackground>
    </View>
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
