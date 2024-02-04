import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { useEffect, useState } from 'react'
import { db } from '../Firebase.js'
import { doc, getDoc} from 'firebase/firestore'


export default function Profile() {
  id = "Tim"
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


  function pointsToRank(points){
      if (points > 1000){
        return "Eco-Master"
      }
      if (points > 500){
        return "Eco-Expert"
      }
      if (points > 100){
        return "Eco-Enthusiast"
      }
      if (points > 50){
        return "Eco-Apprentice"
      }
      return "Eco-Newbie"
    }

    function pointsToIcon(points){
      if (points > 1000){
        return "https://img.freepik.com/premium-vector/hand-drawn-sakura-tree_269774-414.jpg"
      }
      if (points > 500){
        return "https://static.vecteezy.com/system/resources/previews/023/959/252/original/cartoon-tree-no-background-free-png.png"
      }
      if (points > 100){
        return "https://png.pngtree.com/png-clipart/20231015/original/pngtree-cartoon-bush-cute-bush-png-image_13302356.png"
      }
      if (points > 50){
        return "https://png.pngtree.com/png-clipart/20220107/ourmid/pngtree-a-hand-painted-cartoon-sapling-png-image_4099289.png"
      }
      return "https://t4.ftcdn.net/jpg/02/67/63/71/360_F_267637105_YBtjuuI0MFhpAIx2FO8BLJnkxY4eloNA.jpg"
    }

  return (
  

    <View style={styles.container}>
      <View>
        <Image style={{ height: 200, width: 200, borderRadius:90 }} source={{uri:"https://pm1.aminoapps.com/5706/1a0149f52a9607910f10be5d05c2452d0da19326_hq.jpg"}}></Image>
      </View>
      <Text style={styles.name}>🌲{data.name}🌲</Text>
      <Text>Points: {data.points}</Text>
      <Text>Rank: {pointsToRank(data.points)}</Text>
      <View style={{marginTop:50}}>
        {data.points!="loading" && <Image style={{ height: 350, width:350 }} source={{uri:pointsToIcon(data.points)}}/>}
      </View>
      
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  name:{
    fontSize: 40,
    fontWeight: 'bold',
  },
  points:{
    fontSize: 30,
    fontWeight: 'bold',

  },
  rank:{
    fontSize: 30,
    fontWeight: 'bold',
  },



});
