import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Camera } from "expo-camera";
import RoundButton from "./RoundButton";
import image_classification from "./huggingface-api";
import { PictureCol, EntityCol } from "../Firebase";
import { addDoc } from "firebase/firestore";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const CameraComponent = ({ navigation }) => {
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

            let entRef;
            try {
                entRef = await addDoc(EntityCol, {
                    thumbnail: smaller_photo.base64,
                    first_person: "Tim",
                    point: 10,
                    description: `A ${classifications} is a ${classifications} is a type of a ${classifications} is a type of a`,
                    name: classifications,
                    type: 'animal',
                });
                console.log('Entity written with id: ', entRef.id);
            }
            catch (error) {
                console.error('Error adding entity: ', error);
                return;
            }

            const data = {
                photo: smaller_photo.base64,
                entity: entRef.id,
                date: new Date(),
                player: "Tim",
                location: {
                    "latitude": 43.265587025590584,
                    "longitude": -79.9183272503029,
                }
            };
            // console.log(data);

            let docRef = null;
            try {
                docRef = await addDoc(PictureCol, data);
                console.log('Document written with id: ', docRef.id);
            }
            catch (error) {
                console.error('Error adding document: ', error);
                return;
            }

            navigation.navigate("Ecodex");
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
