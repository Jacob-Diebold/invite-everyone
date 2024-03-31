import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableHighlight,
  Text,
  Animated,
  Easing,
} from "react-native";
import appStyles from "../styles/appStyles";
import colors from "../styles/colors";
export default function NavBar({
  navBarHeight,
  handleFirst,
  handleLast,
  handleInfo,
  showLeft,
  showMid,
  showRight,
}) {
  const [showNavBar, setShowNavBar] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const showKeys = Keyboard.addListener("keyboardWillShow", (e) => {
      setHeight(e.endCoordinates.height);
      setShowNavBar(true);
      showAnimation(e.endCoordinates.height);
    });
    const hideKeys = Keyboard.addListener("keyboardWillHide", () => {
      setShowNavBar(false);
      hideAnimation();
      // setHeight(0);
    });
    return function cleanup() {
      showKeys.remove();
      hideKeys.remove();
    };
  });
  const heightAnim = useRef(new Animated.Value(0)).current;
  const showAnimation = (height) => {
    Animated.timing(heightAnim, {
      toValue: height * -1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.in(Easing.bezier(0.38, 0.7, 0.125, 1.0)),
    }).start();
  };
  const hideAnimation = () => {
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      {showNavBar && (
        <Animated.View
          style={[
            styles.container,
            {
              bottom: 0,
              height: navBarHeight,
              position: "absolute",
              transform: [{ translateY: heightAnim }],
            },
          ]}
        >
          <View style={styles.navbar}>
            {showLeft && (
              <>
                <TouchableHighlight
                  underlayColor="#bec0c5"
                  style={{
                    flex: 1,
                    backgroundColor: "#d2d3d8",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0,
                    borderColor: "#d2d3d8",
                  }}
                  onPress={handleFirst}
                >
                  <Text>First Name</Text>
                </TouchableHighlight>
              </>
            )}
            {showMid && (
              <>
                <View style={styles.div} />

                <TouchableHighlight
                  underlayColor="#bec0c5"
                  style={{
                    flex: 1,
                    backgroundColor: "#d2d3d8",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0,
                    borderColor: "#d2d3d8",
                  }}
                  onPress={handleLast}
                >
                  <Text>Last Name</Text>
                </TouchableHighlight>
              </>
            )}
            {showRight && (
              <>
                <View style={styles.div} />
                <TouchableHighlight
                  underlayColor="#bec0c5"
                  style={{
                    flex: 1,
                    backgroundColor: "#d2d3d8",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 0,
                    borderColor: "#d2d3d8",
                  }}
                  onPress={handleInfo}
                >
                  <Text style={{ alignSelf: "center" }}>Group Info</Text>
                </TouchableHighlight>
              </>
            )}

            <>
              <TouchableHighlight
                underlayColor="#bec0c5"
                style={{
                  // backgroundColor: colors.colors.grey[200],
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 0,
                  borderColor: "#d2d3d8",
                  right: 0,
                }}
                onPress={() => Keyboard.dismiss()}
              >
                <Text style={styles.done}>Done</Text>
              </TouchableHighlight>
            </>
          </View>
          {/* <View style={styles.divEnd} /> */}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d2d3d8",
    position: "absolute",
    left: 0,
    position: "absolute",
    width: "100%",
  },
  navbar: {
    backgroundColor: "#d2d3d8",
    flexDirection: "row",
    flex: 1,
  },
  div: {
    backgroundColor: "#bec0c5",
    width: 1,
    height: "50%",
    alignSelf: "center",
    borderRadius: 25,
  },
  divEnd: {
    backgroundColor: "#bec0c5",
    height: 1,
    width: "80%",
    alignSelf: "center",
    borderRadius: 25,
    bottom: 0,
  },
  done: {
    fontFamily: appStyles.text.fontFamily,
    marginHorizontal: 20,
    fontSize: appStyles.text.fontSize,
    fontWeight: "600",
    color: colors.colors.primary[500],
  },
});
