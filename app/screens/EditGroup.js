import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import {
  Divider,
  Appbar,
  TextInput,
  Text,
  Button,
  HelperText,
} from "react-native-paper";
import AvatarHandler from "../components/AvatarHandler";
import pickImage from "../hooks/pickImage";
import useGroupData from "../hooks/useGroupData";
import findIndex from "../hooks/findGroupIndex";
import useStorage from "../hooks/useStorage";
import colors from "../styles/colors";
import appStyles from "../styles/appStyles";
export default function EditGroup({ handleModal, closeModal, selectedGroup }) {
  const [groupName, setGroupName] = useState(selectedGroup.title);
  const [groupDescription, setGroupDescription] = useState(
    selectedGroup.eventInfo
  );
  const [groupInitials, setGroupInitials] = useState(selectedGroup.initials);
  const [date, setDate] = useState(new Date());
  const [groupImage, setGroupImage] = useState(selectedGroup.image);
  const { groupData, setGroupData } = useGroupData();
  const [visible, setVisible] = useState(false);
  const [groupColor, setGroupColor] = useState(selectedGroup.groupColor);

  useEffect(() => {
    if (groupName) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [groupName]);

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
    };
    const index = findIndex(selectedGroup, groupData);
    groupData[index].image = groupImage;
    groupData[index].title = groupName;
    groupData[index].initials = groupInitials;
    groupData[index].eventInfo = groupDescription;
    groupData[index].groupColor = groupColor;
    // console.log("INDEX: ",groupData[index])
    setGroupData([...groupData]);
    await useStorage.storeData([...groupData]);
    closeModal();
  };
  return (
    <View style={[styles.container]}>
      <ImageBackground
        style={{ flex: 1 }}
        source={appStyles.background.default}
      >
        {/* <View style={styles.header} >

      <Text variant='titleMedium' >Add a new group!</Text>
      </View> */}
        <Appbar.Header style={[styles.bar, { backgroundColor: "transparent" }]}>
          <Appbar.BackAction
            onPress={handleModal}
            style={styles.back}
            size={18}
          />
          <Appbar.Content title="Edit Group" titleStyle={styles.headerText} />
        </Appbar.Header>
        <Divider style={styles.divider} />
        <View style={[styles.formContainer]}>
          <TouchableOpacity
            onPress={handleAddImage}
            style={styles.avatarContainer}
          >
            <AvatarHandler
              groupInitials={groupInitials}
              editing={true}
              image={groupImage}
              groupColor={groupColor}
            />
          </TouchableOpacity>

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
                  value={groupDescription}
                  outlineColor={colors.colors.lightGreen[400]}
                  activeOutlineColor={colors.colors.primary[400]}
                />

                {/* Date time picker in case i want to add it in the future */}
                {/* <View style={styles.picker}>
          <Text variant="titleMedium" style={{ fontWeight: "400" }}>
            Event Info
          </Text>
          <View style={styles.pickerContainer}>
            <DateTimePicker onChange={(e,date)=>setDate(date)} value={date} mode="datetime" style={styles.date} />
          </View>
        </View> */}

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
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colors.background,
  },
  bar: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  headerText: {
    fontSize: appStyles.text.headerSize,
    fontFamily: appStyles.text.fontFamily,
    fontWeight: appStyles.text.headerWeight,
  },
  divider: {
    marginBottom: 10,
    backgroundColor: colors.colors.dark[400],
  },
  formContainer: {
    alignItems: "center",
    marginTop: 10,
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
  avatarContainer: {
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: appStyles.text.fontFamily,
  },
});
