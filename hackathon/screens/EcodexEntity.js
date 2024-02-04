import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { PictureCol, db } from '../Firebase';
import { useEffect, useState } from 'react';
import { doc, getDocs, query, where } from 'firebase/firestore';


export default function Ecodex({ navigation }) {
    // const ref = doc(db, "player","tim")
    // console.log(ref)
    const user_id = navigation.getParam("id") //HARD CODED
    const [currentImage, setCurrentImage] = useState(0);

    const [pictureData, setPictureData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const q = query(PictureCol, where("entity", "==", user_id))
            const querySnapshot = await getDocs(q);
            const localPictures = []
            // const tempBookingID = []
            // console.log("snapshot:")
            // console.log(querySnapshot)
            querySnapshot.forEach((picture) => {
                // tempBookingID.push(bookingDoc.id)
                localPictures.push(picture.data())
            })
            // console.log(localPictures)
            setPictureData(localPictures)

        }
        try {
            fetchData();
        }
        catch (e) {
            console.log(e)
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>
                {navigation.getParam("name")}
            </Text>
            <Text style={styles.description}>
                {"Type: "+ navigation.getParam("type")}
            </Text>
            <Text style={styles.description}>
                {navigation.getParam("description")}
            </Text>
            {pictureData.length != 0 ?
                <View style={styles.images}>
                    {pictureData.length > 1 && <TouchableOpacity
                        style={styles.button}
                        onPress={() => setCurrentImage(currentImage === 0 ? pictureData.length - 1 : currentImage - 1)}>
                        <Text>Previous</Text>
                    </TouchableOpacity>}
                    <Image
                        style={styles.image}
                        source={{ uri: "data:image/png;base64," + pictureData[currentImage].photo }}
                    />
                    {pictureData.length > 1 && <TouchableOpacity
                        style={styles.button}
                        onPress={() => setCurrentImage(currentImage === pictureData.length - 1 ? 0 : currentImage + 1)}>
                        <Text>Next</Text>
                    </TouchableOpacity>}
                </View> : null}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 15,
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    images: {
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    button: {
        backgroundColor: '#007f0050',
        padding: 5,
        borderRadius: 3,
        width: 80,
        display: 'flex',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 300
    },
    name: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    description: {
        textAlign: 'center',
        fontSize: 20
    }
});
