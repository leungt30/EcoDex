import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import RoundButton from "../components/RoundButton.js";
import styles from "../styles";
import Map from "../components/map.js";

export default function Home({ navigation }) {
  const pressHandler = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View style={styles.map}>
        <Map />
      </View>
      <View style={styles.nav}>
        <RoundButton
          icon={require("../assets/ecodex.png")}
          onPress={() => pressHandler("Ecodex")}
        />
        <RoundButton
          icon={require("../assets/cam.png")}
          onPress={() => pressHandler("Camera")}
        />
        <RoundButton
          icon={require("../assets/profile.png")}
          onPress={() => pressHandler("Profile")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
