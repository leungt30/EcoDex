import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Home({ navigation }) {
  const pressHandler = (screen) => {
    navigation.navigate(screen)
  }

  return ( 
    <View style={styles.container}>
      <Text>Home screen goes here</Text>
      <Button title='Ecodex' onPress={() => pressHandler('Ecodex')}/>
      <Button title='Profile' onPress={() => pressHandler('Profile')}/>
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
