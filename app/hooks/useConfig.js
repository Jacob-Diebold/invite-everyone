import Constants from "expo-constants";
import useStorage from "./useStorage";
const config = Constants.expoConfig;
const version = Constants.expoConfig.version;
const buildNumber = Constants.expoConfig.ios.buildNumber;
const buildVersion = version + " (" + buildNumber + ")";

const getLatestVersion = async () => {
  const version = await useStorage.getVersion();
  return version;
};
const storeCurrentVersion = async () => {
  await useStorage.storeVersion(buildVersion);
};

export default {
  config,
  version,
  buildNumber,
  buildVersion,
  getLatestVersion,
  storeCurrentVersion,
};
