import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import RoundButton from "./RoundButton";
import image_classification from "./huggingface-api";
import { PictureCol, EntityCol } from "../Firebase";
import { addDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

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
            const smaller_photo = await manipulateAsync(photo.uri, [{ resize: { width: 512 } }], { compress: 0.7, base64: true });

            // Handle the photo as needed (e.g., display it, save to database, etc.)
            const classifications = await image_classification(smaller_photo.uri);
            console.log(classifications)

            const data = { photo: smaller_photo.base64, entity: classifications, date: new Date(), player: "Tim", location: {"accuracy": 35, "altitude": 92.43495559692383, "altitudeAccuracy": 16.5928897857666, "heading": -1, "latitude": 43.265587025590584, "longitude": -79.9183272503029, "speed": -1} };
            console.log(data);

            // if (classifications === 'false')
            //   return;
            
            await addDoc(PictureCol, data)
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
