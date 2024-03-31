import { Alert, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Divider } from "react-native-paper";
import deleteGroup from "../hooks/deleteGroup";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import colors from "../styles/colors";
import appStyles from "../styles/appStyles";
import AvatarHandler from "./AvatarHandler";
export default function groupCard({
  groupData,
  style,
  onPress,
  groupSize,
  setGroupData,
  allGroupData,
  showModal,
  setShowModal,
  sendGroup,
}) {
  return (
    <View
      style={[
        style,
        styles.container,
        {
          shadowColor: colors.colors.dark[700],
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 1 },
        },
      ]}
    >
      <TouchableOpacity
        style={{
          backgroundColor: colors.colors.singletons.white,
          overflow: "hidden",
          borderRadius: 10,
          // borderWidth: 1,
          // borderColor: colors.colors.singletons.white,
        }}
        onPress={onPress}
        onLongPress={async () => {
          await impactAsync(ImpactFeedbackStyle.Heavy);
          Alert.alert(groupData.title, "", [
            {
              text: "Edit",
              onPress: () => {
                sendGroup(groupData);
                setShowModal(true);
              },
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                deleteGroup(groupData, setGroupData, allGroupData);
              },
            },
            { text: "Cancel", style: "cancel" },
          ]);
        }}
      >
        <View style={styles.wrapper}>
          <AvatarHandler
            groupInitials={groupData.initials}
            editing={false}
            image={groupData.image}
            groupColor={groupData.groupColor}
            style={styles.avatar}
            size={100}
          />

          <Divider
            style={{
              height: "60%",
              width: 1,
              backgroundColor: colors.colors.dark[400],
              marginRight: 5,
              opacity: 0.4,
              alignSelf: "center",
            }}
          />

          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "100%",
                height: "100%",
                paddingBottom: 5,
                justifyContent: "center",
                paddingLeft: 4,
              }}
            >
              <Text
                fontFamily={appStyles.text.fontFamily}
                fontWeight={appStyles.text.cardTitleWeight}
                color={colors.colors.singletons.darkText}
                style={[styles.text, { fontSize: 23, fontWeight: "600" }]}
              >
                {groupData.title}
              </Text>
              {groupData.eventInfo ? (
                <Text
                  style={[styles.text, { fontSize: 16, fontWeight: "500" }]}
                >
                  {groupData.eventInfo}
                </Text>
              ) : (
                <View style={{ height: 2 }} />
              )}
              {groupSize != 1 && (
                <Text
                  style={[styles.text, { fontSize: 14, fontWeight: "300" }]}
                >
                  {groupSize} People
                </Text>
              )}
              {groupSize == 1 && (
                <Text
                  style={[styles.text, { fontSize: 14, fontWeight: "300" }]}
                >
                  {groupSize} Person
                </Text>
              )}
              <Text
                style={[
                  styles.text,
                  { fontSize: 14, fontWeight: "400", fontStyle: "italic" },
                ]}
              >
                {groupData.lastSentMessage
                  ? `Last message sent on ${groupData.lastSentMessage}`
                  : "No Messages Sent"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "97%",
    height: 130,
    // borderRadius: 10,
    // overflow: "hidden",
    shadowRadius: 1,
  },
  avatar: {
    margin: 10,
  },
  wrapper: {
    flexDirection: "row",
  },
  text: {
    fontFamily: appStyles.text.fontFamily,
    fontWeight: appStyles.text.normalWeight,
    color: colors.colors.singletons.darkText,
    paddingVertical: 1,
  },
});
