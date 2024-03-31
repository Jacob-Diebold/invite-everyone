import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  RefreshControl,
  Modal,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Card from "../components/Card";
import routes from "../hooks/navigation/routes";
import { FAB } from "react-native-paper";
import useGroupData from "../hooks/useGroupData";
import CreateGroup from "./CreateGroup";
import EditGroup from "./EditGroup";
import useStorage from "../hooks/useStorage";
import colors from "../styles/colors";
import { useIsFocused } from "@react-navigation/native";
import appStyles from "../styles/appStyles";
import { Ionicons } from "@expo/vector-icons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function HomeScreen({ navigation, route }) {
  const { groupData, setGroupData } = useGroupData();
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [groupToSend, setGroupToSend] = useState(null);
  const isFocused = useIsFocused();

  const [showTutorial, setShowTutorial] = useState(false);

  const getTutData = async () => {
    const data = await useStorage.getTutData();
    if (data) {
      setShowTutorial(data.completed);
    } else {
      setShowTutorial(true);
      navigation.navigate(routes.TUTORIAL);
    }
  };
  useEffect(() => {
    getTutData();
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{}}
            onPress={() => navigation.navigate(routes.SETTINGS)}
          >
            <Ionicons
              name="settings"
              size={24}
              color={colors.colors.primary[600]}
            />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const setModalVisible = () => {
    Alert.alert("Close", "Do you really want to leave this page?", [
      {
        text: "Exit",
        onPress: () => setShowModal(false),
        style: "default",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };
  const receiveGroup = (group) => {
    setGroupToSend(group);
  };

  const getData = async () => {
    const storedData = await useStorage.getData();
    // console.log(storedData);
    if (storedData) {
      setGroupData(storedData);
    } else {
      setGroupData([]);
    }
  };

  useEffect(() => {
    getData();
    // navigation.setOptions({
    //   headerRight: () => {
    //     return <InfoButton onPress={() => setDialogVisible(true)} />;
    //   },
    //   // headerTitle: () => (
    //   //   <Image style={{height:50, width:50, top:-10, overflow:"hidden"}} source={require("../../assets/transLogo.png")} />
    //   // ),
    //   // input header right help here
    // });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // console.log("HOME SCREEN FOCUSED!");
      getData();
      getTutData();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.colors.primary[400] }}
    >
      <ImageBackground
        style={{ flex: 1 }}
        source={appStyles.background.default}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.container}>
              {groupData.map((item, index) => {
                const groupSize = item.contactData.length;
                return (
                  <Card
                    groupSize={groupSize}
                    style={styles.card}
                    groupData={item}
                    key={index}
                    onPress={() => {
                      navigation.navigate(routes.GROUP_SCREEN, item);
                    }}
                    setGroupData={setGroupData}
                    allGroupData={groupData}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    sendGroup={receiveGroup}
                  />
                );
              })}
              {/* <Button mode="contained" onPress={async()=>{
            const data = await useStorage.getData()
            console.log(data)
          }} style={{marginBottom:10}}>Log Data</Button>

          <Button mode="contained" onPress={useStorage.clearData} >Clear Data</Button> */}

              {groupData.length == 0 && (
                <View style={{ top: 30, width: "80%" }}>
                  <Text>
                    Click the Add button at the bottom to get started by adding
                    a group!
                  </Text>
                </View>
              )}
            </View>
            <Modal
              animationType="slide"
              visible={showModal}
              onDismiss={() => setModalType(null)}
              transparent={false}
              // presentationStyle="formSheet"
            >
              <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                {modalType === "create" ? (
                  <CreateGroup
                    handleModal={setModalVisible}
                    closeModal={() => setShowModal(false)}
                  />
                ) : (
                  <EditGroup
                    handleModal={setModalVisible}
                    closeModal={() => setShowModal(false)}
                    selectedGroup={groupToSend}
                  />
                )}
              </KeyboardAvoidingView>
            </Modal>
          </ScrollView>

          <FAB
            icon="plus"
            style={[
              styles.fab,
              { backgroundColor: colors.colors.secondary[200] },
            ]}
            onPress={() => {
              setModalType("create");
              setShowModal(true);
            }}
            customSize={60}
            color={colors.colors.dark[800]}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 30,
    borderRadius: 50,
  },
  modalButton: {
    margin: 5,
  },
  bar: {
    justifyContent: "center",
    overflow: "hidden",
  },
  headerText: {
    fontSize: appStyles.text.headerSize,
    fontFamily: appStyles.text.fontFamily,
    fontWeight: appStyles.text.headerWeight,
  },
  divider: {
    backgroundColor: colors.colors.dark[400],
  },
  headerDivider: {
    backgroundColor: colors.colors.dark[400],
    height: 1,
    marginBottom: 5,
  },
  messageBox: {
    borderColor: colors.colors.grey[500],
    borderWidth: 0,
    width: "90%",
    marginVertical: 8,
    borderRadius: 5,
    padding: 3,
    backgroundColor: colors.colors.primary[200],
    zIndex: 0,
  },
  messageVisual: {
    width: 10,
    height: 10,
    position: "absolute",
    bottom: 2,
    left: -15,
    borderColor: colors.colors.grey[500],
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: colors.colors.primary[200],
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    transform: [{ rotate: "240deg" }],
    zIndex: 1,
  },
  buttonContainer: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    position: "absolute",
    bottom: -0.04,
    flexDirection: "row",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
