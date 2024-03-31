import { StyleSheet, View, Text } from "react-native";
import { Divider } from "react-native-paper";

import colors from "../styles/colors";
import appStyles from "../styles/appStyles";
export default function Section({
  leftHeader,
  rightHeader,
  renderLeftHeader: RenderLeftHeader,
  renderRightHeader: RenderRightHeader,
  rightHeaderProps,
  leftHeaderProps,
  children,
  style,
  headerStyle,
}) {
  return (
    <View
      style={[
        {
          borderRadius: 8,
          backgroundColor: colors.colors.singletons.white,
          marginTop: 10,
          // paddingTop: 10,
          overflow: "hidden",
          // flex: 1,
          width: "98%",
          alignSelf: "center",
        },
        style,
      ]}
    >
      <View
        style={[
          styles.groupHeader,
          {
            backgroundColor: colors.colors.lightGreen[50],
          },
          headerStyle,
        ]}
      >
        {RenderLeftHeader ? (
          <View>
            <RenderLeftHeader />
          </View>
        ) : (
          <Text
            style={[
              leftHeaderProps,
              {
                fontSize: appStyles.text.headerSize,
                color: appStyles.text.color,
                fontFamily: appStyles.text.fontFamily,
                fontWeight: appStyles.text.headerWeight,
                alignSelf: "center",
              },
            ]}
          >
            {leftHeader}
          </Text>
        )}

        {RenderRightHeader ? (
          <View style={{ right: 0, position: "absolute", alignSelf: "center" }}>
            <RenderRightHeader />
          </View>
        ) : (
          <Text
            color={appStyles.text.color}
            fontSize={appStyles.text.headerSize}
            fontFamily={appStyles.text.fontFamily}
            fontWeight={appStyles.text.headerWeight}
            style={[
              rightHeaderProps,
              { right: 0, position: "absolute", alignSelf: "center" },
            ]}
          >
            {rightHeader}
          </Text>
        )}
      </View>
      <Divider
        style={{
          backgroundColor: colors.colors.dark[100],
          width: "100%",
        }}
      />
      {children}
      {/* <Button
        style={{
          backgroundColor: colors.colors.primary[500],
          width: "100%",
          // left: "10%",
          borderRadius: 0,
          height: 60,
          justifyContent: "center",
          // marginTop: 10,
        }}
        labelStyle={{
          fontSize: 16,
          borderRadius: 0,
          fontFamily: appStyles.text.fontFamily,
        }}
        contentStyle={{
          width: "100%",
          height: "100%",
          borderRadius: 0,
        }}
        mode="contained"
        onPress={() =>
          useMessage(groupData[groupIndex], groupData, setGroupData)
        }
      >
        Send Messages
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    // height: 150,
    textAlign: "justify",
    textAlignVertical: "top",
    borderRadius: 10,
    maxHeight: 200,
    // marginVertical: 10,
    marginTop: 25 - 6,
    marginBottom: 25,
  },
  avatar: {
    marginTop: 10,
    marginBottom: 10,
  },
  groupSection: {
    // left: 10,
  },
  groupHeader: {
    flexDirection: "row",
    alignContent: "center",
    // flex: 1,
    // backgroundColor: "red",
    // marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // height: 47,
    backgroundColor: "red",
  },
  contactButton: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
  },
});
