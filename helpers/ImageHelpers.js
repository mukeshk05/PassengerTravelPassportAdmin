import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import { ref, getDownloadURL, uploadBytes, uploadTask } from "firebase/storage";

export const openImageLibrary = async () => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status !== "granted") {
    alert("Sorry, we need camera roll permission to select an image");
    return false;
  } else {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    return !result.cancelled ? result : false;
  }
};

export const openCamera = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.MEDIA_LIBRARY,
    Permissions.CAMERA
  );

  if (status !== "granted") {
    alert("Sorry, we need camera roll & camera permission to select an image");
    return false;
  } else {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
      allowsEditing: Platform.OS == "ios" ? false : true,
      aspect: [4, 3],
    });

    return !result.cancelled ? result : false;
  }
};
export const prepareBlob = async (imageUri) => {
  const blob = await new Promise((resolve, reject) => {
    //new request
    const xml = new XMLHttpRequest();

    //success resolved it
    xml.onload = function () {
      resolve(xml.response);
    };

    //error threw new error
    xml.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Image Upload failed"));
    };

    //set the response type to get the blob
    xml.responseType = "blob";
    xml.open("GET", imageUri, true);
    //send the request
    xml.send();
  });

  return blob;
};

export const checkProfileImage = async (uid) => {
  var profileImageUrl = "https://bootdey.com/img/Content/avatar/avatar6.png";
  const storageRef = ref(firebaseStorage, "profile/" + uid);

  await getDownloadURL(storageRef)
    .then((url) => {
      profileImageUrl = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  return profileImageUrl;
};
