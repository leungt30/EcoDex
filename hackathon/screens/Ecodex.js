import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { EntityCol, db } from '../Firebase.js';
import { doc, getDocs, query, setDoc, where,orderBy } from 'firebase/firestore';
export default function Ecodex({navigation}) {

  const [entities, setEntities] = useState([])
  useEffect(() => {
    // Fetch data from the API
    async function fetchData() {
      try {
        const q = query(EntityCol, orderBy('name'));
        const querySnapshot = await getDocs(q);
        let localEcodex = [];
        querySnapshot.forEach((doc) => localEcodex.push({id:doc.id,...doc.data()}));
        
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

  // const pressHandler = (screen,arg) => {
  //   navigation.navigate(screen,arg);
  // };
  return (
    
    <View style={styles.container}>
      <Text>Plant collection goes here</Text>
      <View style={styles.entities}>
        {entities.map((entity, i) => <Button title={entity.name} key={i} onPress={() => navigation.navigate("EcodexEntity",entity)} />)}</View>
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

  entities:{
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '20px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  entityStyle:{
    width: '100%',
    backgroundColor: '#f4f4f4',
    padding: '10px',
    
  }
  }
);
