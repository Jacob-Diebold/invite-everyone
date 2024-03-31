import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import colors from "../styles/colors";
import { cacheDirectory } from "expo-file-system";

export default function AvatarHandler({
  image,
  groupInitials,
  editing,
  groupColor,
  style,
  size,
}) {
  const dir = cacheDirectory;
  const name = image?.uri?.split("/ImagePicker")[1];
  const imageUri = dir + "ImagePicker" + name;
  if (image) {
    return (
      <View style={style}>
        <Avatar.Image
          alignSelf="center"
          size={size ? size : 125}
          source={
            image?.uri
              ? { uri: imageUri }
              : { uri: "data:image/jpeg;base64," + image?.base64 }
          }
          backgroundColor={groupColor}
        />
        {editing && (
          <Avatar.Text
            alignSelf="center"
            size={size ? size : 25}
            style={styles.addAvatar}
            label="+"
            color="white"
          />
        )}
      </View>
    );
  } else if (groupInitials) {
    return (
      <View style={style}>
        <Avatar.Text
          alignSelf="center"
          size={size ? size : 125}
          label={groupInitials}
          backgroundColor={groupColor}
        />
        {editing && (
          <Avatar.Text
            alignSelf="center"
            size={size ? size : 25}
            style={styles.addAvatar}
            label="+"
            color="white"
          />
        )}
      </View>
    );
  } else {
    return (
      <View style={style}>
        <Avatar.Icon
          alignSelf="center"
          size={size ? size : 125}
          style={styles.avatar}
          icon="image"
          backgroundColor={groupColor}
        />
        {editing && (
          <Avatar.Text
            alignSelf="center"
            size={25}
            style={styles.addAvatar}
            label="+"
            color="white"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    fontSize: 10,
  },
  addAvatar: {
    backgroundColor: colors.colors.primary[500],
    bottom: 5,
    right: 5,
    position: "absolute",
  },
});
