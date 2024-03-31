import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import appStyles from "./app/styles/appStyles";
import HomeScreen from "./app/screens/HomeScreen";
import GroupScreen from "./app/screens/GroupScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./app/hooks/navigation/rootNavigation";
import GroupContext from "./app/hooks/useContext";
import AddContactsScreen from "./app/screens/AddContactsScreen";
import groupDataStructure from "./app/data/groupDataStructure";
import colors from "./app/styles/colors";
import TutorialScreen from "./app/screens/TutorialScreen";
import useConfig from "./app/hooks/useConfig";

const Stack = createNativeStackNavigator();
export default function App() {
  const [groupData, setGroupData] = useState(groupDataStructure.groups);
  const [showTutorial, setShowTutorial] = useState(false);

  const getVersionData = async () => {
    const versionData = await useConfig.getLatestVersion();
    // console.log(versionData);
    if (versionData === useConfig.buildVersion) {
      // console.log("Version has not been updated");
    } else {
      // CALL ANY FUNCTIONS HERE THAT I WANT TO BE RUN WHENEVER A NEW VERSION GOES OUT
      console.log("This is a new version");
      await useConfig.storeCurrentVersion();
      //TODO: I can add an updates screen to show what is new in this version here, I can also add a button in the settings to show update notes
    }
    //// This is for testing to clear the version data to test new implements
    // useStorage.clearVersionData()
  };
  useEffect(() => {
    getVersionData();
  }, []);
  // const theme = extendTheme({
  //   colors: {
  //     // Add new color
  //     primary: {
  //       50: "#E3F2F9",
  //       100: "#C5E4F3",
  //       200: "#A2D4EC",
  //       300: "#7AC1E4",
  //       400: "#47A9DA",
  //       500: "#0088CC",
  //       600: "#007AB8",
  //       700: "#006BA1",
  //       800: "#005885",
  //       900: "#003F5E",
  //     },
  //   },
  // });

  return (
    <GroupContext.Provider
      value={{ groupData, setGroupData, showTutorial, setShowTutorial }}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.colors.mediumGreen[200],
              },
              headerTitleStyle: {
                fontFamily: appStyles.text.fontFamily,
                color: appStyles.text.color,
                fontWeight: appStyles.text.navWeight,
              },
              headerBackTitleStyle: {
                fontFamily: appStyles.text.fontFamily,
              },
              title: "Invite Everyone",
              headerShown: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="GroupScreen"
            component={GroupScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.colors.mediumGreen[200],
              },
              headerTintColor: colors.colors.primary[600],
              headerTitleStyle: { color: colors.colors.singletons.darkText },
              title: "",
              headerShown: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="AddContacts"
            component={AddContactsScreen}
            options={{
              title: "Select Contacts",
              headerStyle: {
                backgroundColor: colors.colors.mediumGreen[200],
              },
              headerTintColor: colors.colors.primary[600],

              headerTitleStyle: { color: colors.colors.singletons.darkText },
              headerShown: true,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerStyle: {
                backgroundColor: colors.colors.mediumGreen[200],
              },
              headerTitleStyle: {
                fontFamily: appStyles.text.fontFamily,
                fontWeight: appStyles.text.navWeight,
                color: colors.colors.singletons.darkText,
              },
              headerTintColor: colors.colors.primary[600],
            }}
          />
          <Stack.Screen
            name="Tutorial"
            component={TutorialScreen}
            options={{
              headerShown: true,
              headerBackVisible: false,
              headerStyle: {
                backgroundColor: colors.colors.mediumGreen[200],
              },
              headerTitleStyle: {
                fontFamily: appStyles.text.fontFamily,
                fontWeight: appStyles.text.navWeight,
              },
              headerTitle: "App Tutorial",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 50,
  },
  header: {
    backgroundColor: "blue",
  },
  test: {
    borderStyle: "solid",
  },
});
