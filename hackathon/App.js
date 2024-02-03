import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyComponent from './components/test.js';
import Navigator from './routes/HomeStack'


export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      {/* <Text>Home</Text>
      <MyComponent text="hi"></MyComponent>
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
