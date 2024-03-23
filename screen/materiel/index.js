import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar } from 'react-native';
import MeubleList from './components/meuble';
import ElecList from './components/elec';
import MaintenanceList from './components/maintenance';

const Materiel = () => {
  const [selectedComponent, setSelectedComponent] = useState('maintenance');
  const scrollViewRef = useRef(null);

  const scrollToButtons = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'meuble':
        return <MeubleList />;
      case 'elec':
        return <ElecList />;
      case 'maintenance':
      default:
        return <MaintenanceList />;
    }
  };
  
  return (
    <ScrollView ref={scrollViewRef} style={{ backgroundColor: "#CFA875" }}>
      <View style={{ marginTop: '10%', paddingHorizontal: '4%' }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "56%", marginTop: '4%' }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              Les meubles et materiels dans notre maison {" "}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "5%",
              backgroundColor: "#CD8A3E",
              height: 45,
              width: 45,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 11,
              marginTop: 15,
            }}
          >
            <Image
              source={require("./images/profile.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#7B6945",
            marginTop: 25,
            padding: 20,
            borderRadius: 9,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ width: "40%" }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 21 }}
              >
                Notification
              </Text>
              <Text style={{ color: "white", marginTop: 5 }}>
                Liste des bien mobilier
              </Text>
            </View>
            <View
              style={{ position: "absolute", top: -70, right: 0, bottom: 150 }}
            >
              <Image
                source={require("./images/houseMat.png")}
                style={{ width: 160, height: 160 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#CD8A3E",
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 11,
              }}
            >
              <Text style={{ color: "white" }}>Notification</Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "white",
                width: 135,
                height: 1,
                bordeColor: "white",
              }}
            ></View>
            <Image
              source={require("./images/info.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
          <TouchableOpacity style={[styles.barButton, selectedComponent === 'meuble' && styles.selected]} onPress={() => setSelectedComponent('meuble')}>
            <Text style={styles.buttonText}>Meuble</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.barButton, selectedComponent === 'elec' && styles.selected]} onPress={() => setSelectedComponent('elec')}>
            <Text style={styles.buttonText}>Électricité</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.barButton, selectedComponent === 'maintenance' && styles.selected]} onPress={() => setSelectedComponent('maintenance')}>
            <Text style={styles.buttonText}>Maintenance</Text>
          </TouchableOpacity>
        </View>
        {renderComponent()}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  barButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#F9C877',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  selected: {
    backgroundColor: '#CD8A3E',
  },
});

export default Materiel;
