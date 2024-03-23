import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Elec from '../../../../materialData/electric';

const ElecList = () => {
  const [newElec, setNewElec] = useState({
    appliance: '',
    brand: '',
    purchaseDate: '',
    warrantyDate: '',
    expirationDate: '',
    energyConsumption: '',
    location: '',
    category: '',
    shop: ''
  });

  const [elecs, setElecs] = useState(Elec);
  const [isAddingNewElec, setIsAddingNewElec] = useState(false);

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
    setNewElec({ ...newElec, [selectedDateKey]: date.toISOString() });
    hideDatePicker();
  };

  const handleInputChange = (key, value) => {
    setNewElec({ ...newElec, [key]: value });
  };

  const handleAddElec = () => {
    const updatedElecs = [...elecs, newElec];
    setElecs(updatedElecs);
    // Clear input fields after adding
    setNewElec({
      appliance: '',
      brand: '',
      purchaseDate: '',
      warrantyDate: '',
      expirationDate: '',
      energyConsumption: '',
      location: '',
      category: '',
      shop: ''
    });
    setIsAddingNewElec(false);
  };

  return (
    <View style={styles.container}>
      {!isAddingNewElec ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {elecs.map(elec => (
            <View key={elec.id} style={styles.elecContainer}>
              <Text style={styles.name}>{elec.appliance}</Text>
              <Text>Marque: {elec.brand}</Text>
              <Text>Date d'achat: {elec.purchaseDate}</Text>
              <Text>Date de garantie: {elec.warrantyDate}</Text>
              <Text>Date d'expiration: {elec.expirationDate}</Text>
              <Text>Consommation d'énergie: {elec.energyConsumption}</Text>
              <Text>Emplacement: {elec.location}</Text>
              <Text>Catégorie: {elec.category}</Text>
              <Text>Magasin: {elec.shop}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Elec</Text>
          <TextInput
            style={styles.input}
            placeholder="Appliance"
            value={newElec.appliance}
            onChangeText={text => handleInputChange('appliance', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={newElec.brand}
            onChangeText={text => handleInputChange('brand', text)}
          />
          <TouchableOpacity onPress={() => showDatePicker('purchaseDate')}>
            <Text style={styles.dateText}>Purchase Date: {newElec.purchaseDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('warrantyDate')}>
            <Text style={styles.dateText}>Warranty Date: {newElec.warrantyDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('expirationDate')}>
            <Text style={styles.dateText}>Expiration Date: {newElec.expirationDate}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Energy Consumption"
            value={newElec.energyConsumption}
            onChangeText={text => handleInputChange('energyConsumption', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newElec.location}
            onChangeText={text => handleInputChange('location', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={newElec.category}
            onChangeText={text => handleInputChange('category', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Shop"
            value={newElec.shop}
            onChangeText={text => handleInputChange('shop', text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddElec}>
            <Text style={styles.addButtonText}>Add Elec</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsAddingNewElec(false)}>
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
      <TouchableOpacity style={styles.floatingButton} onPress={() => setIsAddingNewElec(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#CFA875'
  },
  elecContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor:'#fff'
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent:'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default ElecList;
