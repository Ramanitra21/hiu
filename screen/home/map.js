import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map() {
  const initialPosition = {
    latitude: -18.870825143451402,
    longitude: 47.509941495090075,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    {
      coordinate: initialPosition,
      title: "Votre position actuelle",
      pinColor: "red",
    },
    {
      coordinate: {
        latitude: -18.84004089035349,
        longitude: 47.46849363759761,
      },
      title: "Bricodis Imerinafovoany",
      pinColor: "blue",
    },
    {
      coordinate: {
        latitude: -18.83935921414285,
        longitude: 47.461139098050026,
      },
      title: "Score Talatamaty",
      pinColor: "blue",
    },
    {
      coordinate: {
        latitude: -18.870054474814836,
        longitude: 47.51237313373051,
      },
      title: "Sanifer Alarobia",
      pinColor: "blue",
    },
    {
      coordinate: {
        latitude: -18.870940971656246,
        longitude: 47.51082155128645,
      },
      title: "Dyve Garder ANosivavaka",
      pinColor: "blue",
    },
    {
      coordinate: {
        latitude: -18.889058473117966,
        longitude: 47.51104301126096,
      },
      title: "Gifi andraharo",
      pinColor: "blue",
    },
  ];

  const [showMap, setShowMap] = useState(true);

  const handleHideMap = () => {
    setShowMap(false);
  };

  return (
    <View style={styles.container}>
      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialPosition}
            showsUserLocation={true}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                pinColor={marker.pinColor}
              />
            ))}
          </MapView>
         
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});
