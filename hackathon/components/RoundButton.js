import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const RoundButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#007f0050",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default RoundButton;
