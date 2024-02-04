import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export const analyzeImage = async (uri) => {
    try {
        if (!uri) {
            console.log("No image loaded!");
            return;
        }

        const apiKey = process.env.EXPO_PUBLIC_GC_API;
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const base64ImageData = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const requestData = {
            requests: [
                {
                    image: {
                        content: base64ImageData,
                    },
                    features: [
                        {
                            type: "LABEL_DETECTION",
                            maxResults: 5,
                        },
                    ],
                },
            ],
        };

        const apiResponse = await axios.post(apiUrl, requestData);
        return apiResponse.data.responses[0].labelAnnotations;
    } catch (error) {
        console.error(`Error analyzing image: ${error}`);
    }
}

const DetectObject = () => {
    const [imageUri, setImageUri] = useState(null);
    const [labels, setLabels] = useState([]);

    // Allow the user to pick an image from their phone
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        } catch (error) {
            console.error(`Error picking image: ${error}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Google Cloud Vision API Demo</Text>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 300, height: 300 }}
                ></Image>
            )}
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Choose an image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => {
                setLabels(await analyzeImage(imageUri));
            }} style={styles.button}>
                <Text style={styles.buttonText}>Analyze image</Text>
            </TouchableOpacity>
            {labels.length > 0 && (
                <View>
                    <Text>Labels:</Text>
                    {labels.map((label, i) => {
                        return <Text key={i}>{JSON.stringify(label)}</Text>;
                    })}
                </View>
            )}
        </View>
    );
};

export default DetectObject;

const styles = StyleSheet.create({
    container: {},
    image: {
        width: "180px",
        height: "auto",
    },
});
