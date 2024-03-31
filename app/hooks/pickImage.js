import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import AlertAsync from "react-native-alert-async";

const getImage = async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted) {
    Alert.alert(
      "Permissions Denied",
      "Please go to your settings and allow Invite Everyone to have access to your photos if you would like to add a picture."
    );
  }
  const image = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: false,
    quality: undefined,
  });
  console.log("-----IMAGE Start-----");
  // console.log(image.assets[0].uri.split("/ImagePicker"));
  console.log("-----IMAGE End-----");

  if (image.canceled) return;
  return image.assets[0];
};
const editImage = async (uri) => {
  const choice = await AlertAsync("Group Image", "What would you like to do?", [
    {
      text: "Change Image",
      style: "default",
      // onPress: () => getImage(),
      onPress: () => "add",
    },
    {
      text: "Delete Image",
      style: "destructive",
      onPress: () => "delete",
    },
    { text: "Cancel", style: "cancel" },
  ]);
  if (choice === "add") {
    const uri = await getImage();
    return uri;
  } else if (choice === "delete") {
    return undefined;
  } else {
    return uri;
  }
};
const pickImage = async (uri) => {
  if (!uri) {
    return await getImage();
  } else {
    return await editImage(uri);
  }
};

export default { pickImage, getImage, editImage };
