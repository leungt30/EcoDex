import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import MyComponent from './components/test.js';
import { useEffect, useState } from 'react'
import { db } from '../Firebase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function Profile() {
  id = "tim"
  const [data, setData] = useState({
    "name": "loading",
    "points":"loading",
    // "rank":"loading",
     })
  
  
    useEffect(() => {
      async function fetchData() {
          const playerRef = doc(db, "player", id)
          const docSnap = await getDoc(playerRef)
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




  return (
    
    <View style={styles.container}>
      <Text>Profile page goes here</Text>
      <Text>Name:{data.name} Points:{data.points} Rank:{data.rank}</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
