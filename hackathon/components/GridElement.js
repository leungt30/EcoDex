import React from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";

const GridElement = ({ onPress, thumbnail, caption }) => {
  return (
    <TouchableOpacity style={styles.element} onPress={onPress}>
      <Image source={{ uri: "data:image/png;base64," + thumbnail} } style={styles.thumbnail} />
      <Text style={styles.caption}>{caption}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  element: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#007f0050",
    alignItems: "center",
    boxSizing: 'border-box',
    padding: 10,
  },
  caption: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 10
  },
});

export default GridElement;
