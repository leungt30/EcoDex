import {View , Text, Image} from 'react-native';
import { PictureCol, db } from '../Firebase';
import { useEffect, useState } from 'react';
import { doc, getDocs, query, where } from 'firebase/firestore';


export default function Ecodex({navigation}) {
    // const ref = doc(db, "player","tim")
    // console.log(ref)
    const user_id = navigation.getParam("id") //HARD CODED
    
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
                localPictures.push(picture.data())})
            // console.log(localPictures)
            setPictureData(localPictures)
        
        }
        try{
        fetchData();
        }
        catch(e){
            console.log(e)
        }
    }, []);

    return (
      <View>
        {pictureData.length!=0 && pictureData.map((pic, index) => (
        <Image
          key={index}  // Ensure to provide a unique key for each item in the array
          style={{ height: 108, width: 192 }}
          source={{ uri: "data:image/png;base64," + pic.photo }}
        />
      ))}
        <Text>EcodexEntity page goes here: {navigation.getParam("id")}! {navigation.getParam("description")}</Text>
        {/* {pictureData.length!=0 && <Text>Picture Data: {"data:image/png;base64,"+pictureData[0]["photo"]}</Text>} */}
      </View>
    );
  }

//   const styles = StyleSheet.create({
    
//     }
//   );
  