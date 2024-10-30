import * as React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { Alert, StyleSheet, View } from "react-native";

import { Coordinates } from "@/types/Coordinates";
import { Region } from "@/types/Region";

const { useState, useEffect } = React;

interface Props {
  initialRegion: Region;
  onChange: ({ latitude, longitude }: Coordinates) => void;
}

export default function MapScreen({ initialRegion, onChange }: Props) {
  const [region, setRegion] = useState<Region>(initialRegion);

  const getCurrentLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await getCurrentPositionAsync({});
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const onPress = ({ latitude, longitude }: Coordinates) => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    onChange({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        initialRegion={initialRegion}
        onPress={(event) => onPress(event.nativeEvent.coordinate)}
      >
        <Marker
          key={`${region.latitude}&${region.longitude}`}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          pinColor="#ff7733"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  },
});
