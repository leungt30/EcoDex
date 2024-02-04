import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import RoundButton from "./RoundButton";
import { analyzeImage } from "./vision-api";

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
      const labels = await analyzeImage(photo.uri);
      console.log("Labels", labels);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
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
