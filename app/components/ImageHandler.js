import { StyleSheet, View, Image } from "react-native";
import colors from "../styles/colors";
import { cacheDirectory } from "expo-file-system";

export default function ImageHandler({ style, image }) {
  // const imageData = { uri: "data:image/jpeg;base64," + uri };
  const dir = cacheDirectory;
  const name = image?.uri?.split("/ImagePicker")[1];
  const imageUri = dir + "ImagePicker" + name;

  // console.log(uri)
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: imageUri }} style={[styles.image, { flex: 1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 225,
    backgroundColor: colors.colors.lightGreen[50],
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
});
