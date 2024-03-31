import { StyleSheet, Button as NativeButton, Alert } from "react-native";
import { useState, useEffect } from "react";
import Step0 from "../components/tutorialSteps/Step0";
import Step1 from "../components/tutorialSteps/Step1";
import Step2 from "../components/tutorialSteps/Step2";
import Step3 from "../components/tutorialSteps/Step3";
import Step4 from "../components/tutorialSteps/Step4";
import Step5 from "../components/tutorialSteps/Step5";
import Step6 from "../components/tutorialSteps/Step6";
import Step7 from "../components/tutorialSteps/Step7";
import Step8 from "../components/tutorialSteps/Step8";
import Step9 from "../components/tutorialSteps/Step9";
import useGroupData from "../hooks/useGroupData";
import routes from "../hooks/navigation/routes";
import colors from "../styles/colors";
import useStorage from "../hooks/useStorage";
export default function TutorialScreen({ navigation }) {
  // --------------------TESTING AREA FOR FIRST TIME GUIDED WALK THROUGH----------------------------------
  const { showTutorial, setShowTutorial } = useGroupData();
  const tutorial = {
    completed: false,
    currentStep: 0,
  };
  const [tutorialData, setTutorialData] = useState(tutorial);
  const [tutorialGroup, setTutorialGroup] = useState();
  const nextStep = () => {
    tutorialData.currentStep = tutorialData.currentStep + 1;
    console.log(tutorialData);
    setTutorialData({ ...tutorialData });
  };
  const prevStep = () => {
    if (tutorialData.currentStep === 0) return;
    tutorialData.currentStep = tutorialData.currentStep - 1;
    console.log(tutorialData);
    setTutorialData({ ...tutorialData });
  };

  const endTut = () => {
    navigation.navigate(routes.HOME_SCREEN);
  };

  const handleEndTut = async () => {
    await useStorage.storeTutData({ completed: true });
    setShowTutorial(false);
    endTut();
  };

  useEffect(() => {
    console.log(tutorialGroup);
  }, [tutorialGroup]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <NativeButton
            title="Skip"
            color={colors.colors.primary[700]}
            onPress={() =>
              Alert.alert(
                "Skip Tutorial?",
                "Are you sure you want to skip the tutorial? You can find it again in the settings menu.",
                [
                  { text: "Skip", onPress: handleEndTut, style: "default" },
                  { text: "Cancel", style: "cancel" },
                ]
              )
            }
          />
        );
      },
      // headerTitle: () => (
      //   <Image style={{height:50, width:50, top:-10, overflow:"hidden"}} source={require("../../assets/transLogo.png")} />
      // ),
      // input header right help here
    });
  }, []);
  // ---------- END GUIDED WALK THOUGH ZONE -----------
  return (
    <>
      {tutorialData.currentStep === 0 && (
        <Step0 nextStep={nextStep} prevStep={prevStep} />
      )}
      {tutorialData.currentStep === 1 && (
        <Step1 nextStep={nextStep} prevStep={prevStep} />
      )}
      {(tutorialData.currentStep === 2 || tutorialData.currentStep === 3) && (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          step={tutorialData.currentStep}
          setTutorialGroup={setTutorialGroup}
        />
      )}
      {tutorialData.currentStep === 4 && (
        <Step3
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
        />
      )}
      {tutorialData.currentStep === 5 && (
        <Step4
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
        />
      )}
      {tutorialData.currentStep === 6 && (
        <Step5
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
          setGroupData={setTutorialGroup}
        />
      )}
      {tutorialData.currentStep === 7 && (
        <Step6
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
          setGroupData={setTutorialGroup}
        />
      )}
      {(tutorialData.currentStep === 8 || tutorialData.currentStep === 9) && (
        <Step7
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
          setGroupData={setTutorialGroup}
        />
      )}
      {tutorialData.currentStep === 10 && (
        <Step8
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
          setGroupData={setTutorialGroup}
        />
      )}
      {tutorialData.currentStep === 11 && (
        <Step9
          nextStep={nextStep}
          prevStep={prevStep}
          groupData={tutorialGroup}
          setGroupData={setTutorialGroup}
          setShowTutorial={setShowTutorial}
          endTut={endTut}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
