import AsyncStorage from "@react-native-async-storage/async-storage";
const APP_KEY = "@INVITE_EVERYONE_KEY";
const TUT_KEY = "@TUTORIAL_COMPLETED_KEY";
const VERSION_KEY = "@INVITE_EVERYONE_VERSION_KEY";
const MESSAGE_KEY = "@INVITE_EVERYONE_MESSAGE_KEY";
const storeData = async (value) => {
  try {
    if (value?.length === 0) {
      await clearData();
    } else {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(APP_KEY, jsonValue);
    }
  } catch (error) {
    console.log("ERROR: storing group data to Async Storage: ", error);
  }
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(APP_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("ERROR: getting group data from Async Storage: ", error);
  }
};

const clearData = async () => {
  try {
    await AsyncStorage.removeItem(APP_KEY, () => {
      console.log("Group Data storage cleared.");
    });
  } catch (error) {
    console.log("ERROR: clearing group data from Async Storage: ", error);
  }
};

const storeTutData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(TUT_KEY, jsonValue);
  } catch (error) {
    console.log("ERROR: storing tutorial data to Async Storage: ", error);
  }
};
const getTutData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TUT_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("ERROR: getting tutorial data from Async Storage: ", error);
  }
};

const clearTutData = async () => {
  try {
    await AsyncStorage.removeItem(TUT_KEY, () => {
      console.log("Tutorial storage cleared.");
    });
  } catch (error) {
    console.log("ERROR: clearing Tutorial data from Async Storage: ", error);
  }
};
const getVersion = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(VERSION_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("ERROR: getting version data from Async Storage: ", error);
  }
};
const storeVersion = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(VERSION_KEY, jsonValue);
  } catch (error) {
    console.log("ERROR: storing version data to Async Storage: ", error);
  }
};
const clearVersionData = async () => {
  try {
    await AsyncStorage.removeItem(VERSION_KEY, () => {
      console.log("Version storage cleared.");
    });
  } catch (error) {
    console.log("ERROR: clearing Version data from Async Storage: ", error);
  }
};
const getMessageCount = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(MESSAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log("ERROR: getting message data from Async Storage: ", error);
  }
};
const storeMessageCount = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(MESSAGE_KEY, jsonValue);
  } catch (error) {
    console.log("ERROR: storing message data to Async Storage: ", error);
  }
};
const clearMessageCount = async () => {
  try {
    await AsyncStorage.removeItem(MESSAGE_KEY, () => {
      console.log("Message storage cleared.");
    });
  } catch (error) {
    console.log("ERROR: clearing Version data from Async Storage: ", error);
  }
};
export default {
  storeData,
  getData,
  clearData,
  storeTutData,
  getTutData,
  clearTutData,
  getVersion,
  storeVersion,
  clearVersionData,
  getMessageCount,
  storeMessageCount,
  clearMessageCount,
};
