import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    const mapRef = useRef(null);

    // Update camera view to current location
    const animate_point = async () => {
        console.log('called');
        await mapRef.current.animateCamera({
            center: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            },
            zoom: 18,
            pitch: 60,
        });
    }

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

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
            });
        };

        getLocation();
    }, []);

    // Prevent user from moving the map
    const mapConfig = {
        pitchEnabled: false,
        zoomEnabled: false,
        toolbarEnabled: false,
        scrollEnabled: false,
        rotateEnabled: false,
        showsCompass: false,
        provider: 'google',
    }

    return (
        <View style={styles.container}>
            {initialRegion &&
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                    {...mapConfig}
                    ref={mapRef}
                    onMapLoaded={animate_point}
                >
                    {currentLocation && <Marker
                        coordinate={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        }}>
                        <View>
                            <Text style={{fontSize:60}}>
                                🧍
                            </Text>
                        </View>
                    </Marker>}
                </MapView>}
        </View>
    )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
});