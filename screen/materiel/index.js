import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, Image, StatusBar } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { addNewAppliance } from '../../materialData/electric'; // Importing the Elec array and the function to add new appliance
import MaintenanceList from './components/maintenance';
import ElecList from './components/elec';
import Meuble from '../../materialData/meuble';

const Materiel = () => {
  const [selectedComponent, setSelectedComponent] = useState('maintenance');
  const [newApplianceData, setNewApplianceData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMeuble, setNewMeuble] = useState({
    name: '',
    brand: '',
    purchaseDate: '',
    warrantyDate: '',
    expirationDate: '',
    location: '',
    category: ''
  });
  const [meubles, setMeubles] = useState(Meuble);
  const [isAddingNewMeuble, setIsAddingNewMeuble] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState('');

  const showDatePicker = (key) => {
    setSelectedDateKey(key);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setNewMeuble({ ...newMeuble, [selectedDateKey]: date.toISOString() });
    hideDatePicker();
  };

  const handleInputChange = (key, value) => {
    setNewMeuble({ ...newMeuble, [key]: value });
  };

  const handleAddMeuble = () => {
    const updatedMeubles = [...meubles, newMeuble];
    setMeubles(updatedMeubles);
    setNewMeuble({
      name: '',
      brand: '',
      purchaseDate: '',
      warrantyDate: '',
      expirationDate: '',
      location: '',
      category: ''
    });
    setIsAddingNewMeuble(false);
    setIsModalVisible(false); // Close the modal after adding a new meuble
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setIsAddingNewMeuble(true); // Set this to true to display the form for adding a new meuble
  };

  const handleAddNewAppliance = () => {
    addNewAppliance(newApplianceData);
    toggleModal();
    setNewApplianceData({});
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
    <View style={{ backgroundColor: "#CFA875" }}>
      <ScrollView>
        <View style={{ marginTop: '10%', paddingHorizontal: '4%' }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ width: "56%", marginTop: '4%' }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                Les meubles et matériels dans notre maison
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
                  Liste des biens mobiliers
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
<View style={{ height: '100%' }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
    <TouchableOpacity style={[styles.barButton, selectedComponent === 'meuble' && styles.selected]} onPress={() => setSelectedComponent('meuble')}>
      <Text style={styles.buttonText}>Meuble</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.barButton, selectedComponent === 'elec' && styles.selected]} onPress={() => setSelectedComponent('elec')}>
      <Text style={styles.buttonText}>Appareil</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.barButton, selectedComponent === 'maintenance' && styles.selected]} onPress={() => setSelectedComponent('maintenance')}>
      <Text style={styles.buttonText}>Maintenance</Text>
    </TouchableOpacity>
  </View>
  <View style={{ marginTop: '4%', height: '86%', flexDirection: 'row', marginHorizontal: '2%' }}>
    <View style={{ backgroundColor: 'white', width: '0.5%', marginRight: '2%' }}></View>
    <View style={styles.container}>
      {!isAddingNewMeuble ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {meubles.map(meuble => (
            <View key={meuble.id} style={styles.meubleContainer}>
              <Text style={styles.name}>{meuble.name}</Text>
              <Text>Marque: {meuble.brand}</Text>
              <Text>Date d'achat: {meuble.purchaseDate}</Text>
              <Text>Date de garantie: {meuble.warrantyDate}</Text>
              <Text>Date d'expiration: {meuble.expirationDate}</Text>
              <Text>Emplacement: {meuble.location}</Text>
              <Text>Catégorie: {meuble.category}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Meuble</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={newMeuble.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={newMeuble.brand}
            onChangeText={text => handleInputChange('brand', text)}
          />
          <TouchableOpacity onPress={() => showDatePicker('purchaseDate')}>
            <Text style={styles.dateText}>Purchase Date: {newMeuble.purchaseDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('warrantyDate')}>
            <Text style={styles.dateText}>Warranty Date: {newMeuble.warrantyDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('expirationDate')}>
            <Text style={styles.dateText}>Expiration Date: {newMeuble.expirationDate}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newMeuble.location}
            onChangeText={text => handleInputChange('location', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={newMeuble.category}
            onChangeText={text => handleInputChange('category', text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddMeuble}>
            <Text style={styles.addButtonText}>Add Meuble</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsAddingNewMeuble(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  </View>
  <StatusBar style="auto" />
</View>
</View>
</ScrollView>
<TouchableOpacity style={styles.floatingButton} onPress={handleAddNewAppliance}>
  <Ionicons name="add" size={24} color="white" />
</TouchableOpacity>
{/* Modal for adding new appliance */}
</View>
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
floatingButton: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  backgroundColor: '#CD8A3E',
  borderRadius: 30,
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 3,
},
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
backgroundColor: '#fff',
padding: 20,
borderRadius: 10,
width: '80%',
},
modalTitle: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
paddingHorizontal: 10,
marginBottom: 10,
},
addButton: {
backgroundColor: '#CD8A3E',
padding: 10,
borderRadius: 5,
alignItems: 'center',
marginTop: 10,
},
addButtonText: {
color: '#fff',
fontWeight: 'bold',
},
closeButton: {
backgroundColor: '#aaa',
padding: 10,
borderRadius: 5,
alignItems: 'center',
marginTop: 5,
},
closeButtonText: {
color: '#fff',
fontWeight: 'bold',
},
container: {
flex: 1,
padding: 10,
backgroundColor: '#CFA875',
},
meubleContainer: {
marginBottom: 20,
padding: 10,
borderRadius: 5,
backgroundColor: '#fff',
},
name: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 5,
color: 'black',
},
formContainer: {
marginBottom: 20,
},
formTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 10,
},
dateText: {
fontSize: 16,
marginBottom: 10,
textDecorationLine: 'underline',
color: 'blue',
},
});

export default Materiel;
