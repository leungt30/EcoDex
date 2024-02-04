import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import RoundButton from "./RoundButton";
import image_classification from "./huggingface-api";
import { PictureCol, EntityCol } from "../Firebase";
import { addDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            console.log("Photo taken:", photo);
            // Handle the photo as needed (e.g., display it, save to database, etc.)
            // const labels = await analyzeImage(photo.uri);
            // console.log('Labels', labels);
            const classifications = await image_classification(photo.uri);
            console.log(classifications)

            const base64ImageData = await FileSystem.readAsStringAsync(photo.uri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            const data = {photo: base64ImageData, entity: classifications, date: new Date()};
            console.log(data);

            // if (classifications === 'false')
            //   return;
            
            addDoc(PictureCol, data)
              .then((docRef) => {
                console.log('Document written with id: ', docRef.id);
              })
              .catch((err) => {
                console.error('Error adding document: ', err);
              })
            
        }
    };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ratio={'16:9'}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        ></View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <RoundButton
            icon={require("../assets/takepic.png")}
            onPress={takePicture}
          />
        </View>
      </Camera>
    </View>
  );
};

export default CameraComponent;
