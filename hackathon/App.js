import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/HomeStack";
import styles from "./styles.js";

import SingleEntity from "./components/singleEntity.js";
export default function App() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Navigator style={styles.container} />
    </View>
  );
}
