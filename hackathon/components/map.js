import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  // Keep reference of map
  const mapRef = useRef(null);

  // Update camera view to current location
  const animate_point = async () => {
    if (!mapRef.current) {
      return;
    }
    await mapRef.current.animateCamera({
      center: {
        latitude: currentLocation ? currentLocation.latitude : null,
        longitude: currentLocation ? currentLocation.longitude : null,
      },
      zoom: 18,
      pitch: 60,
    });
  };

  // Continually get the user's location
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setCurrentLocation(location.coords);
      await animate_point();

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0025,
        longitudeDelta: 0.0025,
      });
    };

    getLocation();
    animate_point();

    const key = setInterval(async () => {
      getLocation();
    }, 2500);

    return () => {
      clearInterval(key);
    };
  }, []);

  // Prevent user from moving the map
  const mapConfig = {
    pitchEnabled: false,
    zoomEnabled: false,
    toolbarEnabled: false,
    scrollEnabled: false,
    rotateEnabled: false,
    showsCompass: false,
    provider: "google",
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          {...mapConfig}
          ref={mapRef}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            >
              <View>
                <Text style={{ fontSize: 60 }}>🧍</Text>
              </View>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
