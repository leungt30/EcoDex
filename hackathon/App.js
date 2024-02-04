import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/HomeStack'


import SingleEntity from './components/singleEntity.js';
export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      {/* <Text>Home</Text>
  
      
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
