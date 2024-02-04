import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";

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
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={takePicture}
        >
          <View
            style={{
              border: "none",
              borderRadius: 50,
              backgroundColor: "green",
              padding: 20,
            }}
          >
            <Text style={{ color: "white" }}>capture</Text>
          </View>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraComponent;
