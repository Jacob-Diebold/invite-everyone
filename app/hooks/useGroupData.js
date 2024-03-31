import { useContext } from "react";
import GroupContext from "./useContext";

export default useGroup = () => {
  const { groupData, setGroupData } = useContext(GroupContext);
  const { showTutorial, setShowTutorial } = useContext(GroupContext);

  return { groupData, setGroupData, showTutorial, setShowTutorial };
};
