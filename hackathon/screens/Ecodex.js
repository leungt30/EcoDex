import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { EntityCol, db } from '../Firebase.js';
import { doc, getDocs, query, setDoc, where,orderBy } from 'firebase/firestore';
import GridElement from "../components/GridElement.js"


export default function Ecodex({navigation}) {
  const [entities, setEntities] = useState([])
  useEffect(() => {
    // Fetch data from the API
    async function fetchData() {
      try {
        const q = query(EntityCol, orderBy('name'));
        const querySnapshot = await getDocs(q);
        let localEcodex = [];
        querySnapshot.forEach((doc) => localEcodex.push({id:doc.id, ...doc.data()}));
        
        setEntities(localEcodex);
        
        // console.log(localEcodex);
        // entities.map((entity, i) => {console.log(entity.name)});
      }
      catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }
    fetchData();
  }, []);

  return (
    
    // <View style={styles.container}>
      <View style={styles.entities}>
        {entities.map((entity, i) => <GridElement caption={entity.name} onPress={() => navigation.navigate("EcodexEntity")} thumbnail={entity.thumbnail} key={i} />)}
      </View>
      // <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  entities:{
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  }
);
