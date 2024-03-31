import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-paper";
import ContactCard from "./ContactCard";
import ListItemDeleteAction from "./ListItemDeleteAction";
import useGroupData from "../../hooks/useGroupData";
import findIndex from "../../hooks/findGroupIndex";
import useStorage from "../../hooks/useStorage";
import colors from "../../styles/colors";
import { simpleSort } from "../../hooks/contacts/sortContacts";
const GroupContacts = React.forwardRef(
  (
    {
      contactData,
      params,
      handleModal,
      selectedContact,
      style,
      editContacts,
      turnOffEditButton,
      activeContactLength,
      tutorial = false,
      sentCheck,
    },
    ref
  ) => {
    const [sent, setSent] = useState("sent");
    const { groupData, setGroupData } = useGroupData();

    const [contacts, setContacts] = useState(contactData);
    useEffect(() => {
      simpleSort(contacts);
      // setContacts(test)
      // console.log(contacts.length);
    }, []);

    useEffect(() => {
      try {
        let i = 0;
        contacts.forEach((contact) => {
          if (contact.groupActive === true) {
            i++;
          }
        });
        activeContactLength(i);
      } catch (error) {
        activeContactLength(0);
      }
    }, [groupData]);

    const groupIndex1 = findIndex(params, groupData);

    const updateActiveContact = async (status, index) => {
      if (status === true) {
        contactData[index].groupActive = true;
      } else if (status === false) {
        contactData[index].groupActive = false;
      }

      if (tutorial) {
        return sentCheck(true);
      }
      setGroupData([...groupData]);
      await useStorage.storeData([...groupData]);
    };

    const handleDelete = async (item) => {
      // console.log("DELETE");
      const groupIndex = findIndex(params, groupData);
      const contacts = groupData[groupIndex].contactData;
      let index = contacts.indexOf(item);
      contacts.splice(index, 1);
      setContacts([...contacts]);
      // console.log(item);
      if (tutorial) return;

      await useStorage.storeData(groupData);
    };

    return (
      <View style={[styles.container, style]}>
        {contacts.map((contact, index) => {
          if (index < contacts.length) {
            return (
              <View key={contact.id + index}>
                <ContactCard
                  contact={contact}
                  name={contact.name}
                  active={contact.groupActive}
                  updateContactActiveData={updateActiveContact}
                  index={index}
                  renderRightActions={() => (
                    <ListItemDeleteAction
                      onPress={() => {
                        handleDelete(contact);
                      }}
                      // key={"Delete:"+contact.id + index}
                    />
                  )}
                  handleModal={handleModal}
                  ref={ref}
                  selectedContact={selectedContact}
                  divider={false}
                  sent={contact.status}
                  groupData={groupData}
                  setGroupData={setGroupData}
                  groupIndex={groupIndex1}
                  editContacts={editContacts}
                  handleDelete={() => {
                    turnOffEditButton();
                    handleDelete(contact);
                  }}
                  turnOffEditButton={turnOffEditButton}
                  tutorial={tutorial}
                />

                {index < contacts.length - 1 && (
                  <Divider
                    // key={"Divider:" + contact.id + index}
                    style={{
                      backgroundColor: colors.colors.dark[200],
                      width: "100%",
                    }}
                  />
                )}
              </View>
            );
          }
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    // width: "100%",
    // height: 300
  },
});

export default GroupContacts;
