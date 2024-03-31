import useStorage from "./useStorage";

const checkMessageCount = async () => {
  const count = await useStorage.getMessageCount();
  return count;
};

const addToMessageCount = async () => {
  let count = await checkMessageCount();
  count++;
  useStorage.storeMessageCount(count);
};

export default { checkMessageCount, addToMessageCount };
