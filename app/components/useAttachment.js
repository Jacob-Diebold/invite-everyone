import * as FileSystem from "expo-file-system";

export default useAttachment = (attachment) => {
  console.log(attachment);
  const dir = FileSystem.cacheDirectory;
  const fileName = attachment?.uri?.split("/ImagePicker")[1];
  const attachmentUri = dir + "ImagePicker" + fileName;
  const nameOfFile = attachment.fileName;
  try {
    const extension = attachmentUri.split(".").pop();
    const attachment = {
      uri: attachmentUri,
      mimeType: "image/" + extension,
      filename: nameOfFile,
    };
    return attachment;
  } catch (error) {
    console.log(error);
  }
};
