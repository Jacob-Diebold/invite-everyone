import * as Linking from "expo-linking";
import * as StoreReview from "expo-store-review";
import { Alert } from "react-native";
const showReview = async () => {
  try {
    const available = StoreReview.isAvailableAsync();
    if (!available) return;
    const actionAvailable = await StoreReview.hasAction();
    if (!actionAvailable) return;
    StoreReview.requestReview();
  } catch (error) {
    console.log(error);
  }
};

const writeReview = async () => {
  try {
    const itunesItemId = 6444068969;
    await Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
    );
  } catch (error) {
    Alert.alert(
      "Error",
      "Error transferring to App Store. Please try again later."
    );
  }
};

export default { showReview, writeReview };
