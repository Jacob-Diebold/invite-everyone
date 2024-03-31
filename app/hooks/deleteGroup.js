import { Alert } from "react-native";
import useStorage from "./useStorage";

export default function deleteGroup(groupToDelete, setGroupData, groupData) {
  const deleteAction = async () => {
    // console.log("delete group");
    try {
      const index = groupData.indexOf(groupToDelete)
      // console.log(index)
      groupData.splice(index, 1);
      setGroupData([...groupData]);
      await useStorage.storeData([...groupData])
      
    } catch (error) {
      console.log(error)
    }
  };
  Alert.alert("Delete Group", "Are you sure you want to delete this group?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Yes",
      style: "default",
      onPress: () => deleteAction(),
    },
  ]);
}
