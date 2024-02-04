import {View , Text} from 'react-native';

export default function Ecodex({navigation}) {

    
    return (
      <View>
        <Text>EcodexEntity page goes here: {navigation.getParam("id")}!</Text>
      </View>
    );
  }