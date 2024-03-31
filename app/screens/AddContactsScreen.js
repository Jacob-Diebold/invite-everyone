import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Divider, Searchbar } from "react-native-paper";
import sortContacts from "../hooks/contacts/sortContacts";
import useContacts from "../hooks/contacts/useContacts";
import ContactItem from "../components/contacts/ContactItem";
import useGroupData from "../hooks/useGroupData";
import findIndex from "../hooks/findGroupIndex";
import useStorage from "../hooks/useStorage";
import colors from "../styles/colors";

const Item = ({ contact }) => {
  return (
    <View style={styles.container}>
      <Text>{contact.name}</Text>
    </View>
  );
};

const AddContacts = ({ route, navigation, visible, handleClose }) => {
  const { groupData, setGroupData } = useGroupData();

  const [fullContactList, setFullContactList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activeContacts, setActiveContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState(
    route.params.contactData
  );

  // console.log(groupData)
  // console.log(groupData)
  useEffect(() => {
    getAllContacts();
    // console.log(selectedContacts);
    navigation.setOptions({
      headerShown: true,
      // headerRight: () => {
      //   return (
      //     <NativeButton
      //       title="Done"
      //       style={styles.done}
      //       onPress={() => {
      //         // setGroupData([...groupData]);
      //         console.log(selectedContacts);
      //         console.log(selectedContacts.length)
      //       }}
      //     />
      //   );
      // },
    });
    return async function cleanup() {
      console.log("DATA STORED");
      await useStorage.storeData(groupData);
    };
  }, []);
  //   useEffect(()=> {
  //     // console.log("Active Contacts")
  // // console.log(activeContacts)
  // // console.log("Active Length:", activeContacts.length);
  //   },[activeContacts])

  const getAllContacts = async () => {
    const contacts = await useContacts.getContacts();
    if (!contacts) {
      Alert.alert(
        "Error",
        "Error retrieving contacts.\nPlease submit feedback to developer\nError Code: 0-CON"
      );
    }
    const groupIndex = findIndex(route.params, groupData);
    const DATA = sortContacts(contacts, groupData[groupIndex].contactData);

    setFullContactList(DATA);
  };
  const handleAddToContactList = (contact, active) => {
    const groupIndex = findIndex(route.params, groupData);
    if (active) {
      const foundContact = selectedContacts.find(
        (item) => item.id === contact.id
      );
      const index = selectedContacts.indexOf(foundContact);
      // console.log(foundContact)
      selectedContacts.splice(index, 1);
      // setGroupData([...groupData]);

      // console.log("deleted");
    } else {
      // console.log("added");
      if (contact.phoneNumbers.length === 1) {
        contact.activeNumber = contact.phoneNumbers[0];
      } else {
        contact.activeNumber = false;
        contact.groupActive = false;
      }
      if (selectedContacts.indexOf(contact) === -1) {
        // setGroupData(
        //   [...groupData],
        //   groupData[groupIndex].contactData.push(contact)
        // );
        selectedContacts.push(contact);
      } else {
        console.log("Contact already Added");
      }
    }
    // contact.active = active;
    // selectedContacts.push(contact);
    // setSelectedContacts([...selectedContacts]);
  };

  const renderItem = ({ item }) => {
    return (
      <ContactItem
        params={route.params}
        contact={item}
        handleMasterListUpdate={handleMasterListUpdate}
        handleAddToContactList={handleAddToContactList}
      />
    );
  };

  const separator = () => {
    return <Divider style={{ backgroundColor: colors.colors.primary[400] }} />;
  };

  const handleChange = (text) => {
    setSearchText(text);
    if (text.length === 0) {
      return setSearching(false);
    } else {
      setSearching(true);
    }
    handleSearch(text);
  };
  const foo = [];
  const handleSearch = (text) => {
    fullContactList.filter((item, index) => {
      if (item.name.toLowerCase().includes(text.toLowerCase())) {
        foo.push(item);
      }
      return item.name.toLowerCase().includes(text.toLowerCase());
    });

    setSearchList(foo);
  };
  const handleMasterListUpdate = (item, index, active) => {
    // console.log(item)
    // fullContactList[index].active = active;
    // console.log(fullContactList[index]);
    // if (active) {
    //   setActiveContacts([...activeContacts, item])
    // }
    // console.log(item, index, active)

    // setGroupData([...groupData],groupData[index].active = active)
    setFullContactList(
      [...fullContactList],
      (fullContactList[index].active = active)
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="padding">
      <Searchbar
        style={styles.searchbar}
        onChangeText={handleChange}
        placeholder="Search Contacts"
        placeholderTextColor={colors.colors.grey[400]}
        clearButtonMode="always"
        autoComplete={false}
        autoCorrect={false}
      />

      {searching ? (
        <FlatList
          data={searchList}
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
          keyExtractor={(item) => item.id + item.index}
        />
      ) : (
        <FlatList
          data={fullContactList}
          renderItem={renderItem}
          ItemSeparatorComponent={separator}
          keyExtractor={(item) => item.id + item.index}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colors.primary[700],
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginVertical: 1,
    alignItems: "center",
    height: 40,
  },
  icon: {
    margin: 10,
    color: "gray",
    fontSize: 20,
  },
  text: {
    flex: 1,
  },
  modal: {},

  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  searchbar: {
    borderRadius: 0,
    width: "100%",
    // alignSelf: "center",
    backgroundColor: colors.colors.lightGreen[50],
    color: "red",
  },
  done: {
    color: "red",
  },
});

export default AddContacts;
