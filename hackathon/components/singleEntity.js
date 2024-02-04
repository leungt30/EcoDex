import { Text} from 'react-native';
import { useEffect, useState } from 'react'
import { db } from '../Firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'
export function SingleEntity(props) {
  // Extract properties from the props object
  const { id } = props;
  const [data, setData] = useState({
  "description": "loading",
  "name":"loading",
  "type":"loading",
  "val": "loading" })


  useEffect(() => {
    async function fetchData() {
        const enetityRef = doc(db, "entity", id)
        const docSnap = await getDoc(enetityRef)
        if (docSnap.exists()) {
            // console.log(docSnap.data())
            setData(docSnap.data())
        }
        else {
            // console.log("Data not fetched")
        }
    }
    fetchData();
}, []);

  

    
  
    // Return the created element
    return (<Text>Name:{data.name} Type:{data.type} Description:{data.description} </Text>)
  }

export default SingleEntity