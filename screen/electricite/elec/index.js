import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Elec from '../../../materialData/electric';

const ElecListf = () => {
  const [newElec, setNewElec] = useState({
    appliance: '',
    brand: '',
    purchaseDate: '',
    warrantyDate: '',
    expirationDate: '',
    energyConsumption: '',
    location: '',
    category: '',
    shop: '',
    dailyUsageHours: '' // Nouveau champ pour la durée de fonctionnement quotidienne
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
      shop: '',
      dailyUsageHours: '' // Réinitialiser le champ de saisie pour la prochaine entrée
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
              <Text>L'appareil se trouve dans la piece : {elec.location}</Text>
              <Text>Consommation d'énergie: </Text>
              <Text style={styles.name2}>{elec.energyConsumption}</Text>
              <Text>Durée de fonctionnement quotidienne: </Text>
              <Text style={styles.name2} >{elec.dailyUsageHours } heures/jours</Text>

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
          {/* Ajoutez les nouveaux champs de saisie pour les données supplémentaires */}
          <TextInput
            style={styles.input}
            placeholder="Daily Usage Hours"
            value={newElec.dailyUsageHours}
            onChangeText={text => handleInputChange('dailyUsageHours', text)}
          />
          {/* Reste du code pour les autres champs de saisie */}
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
    backgroundColor:'#9C9FAB'
  },
  elecContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor:'#fff'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#504AA8',
  },
  name2: {
    fontSize: 14,
    fontWeight: 'bold',
   
    color: '#504AA8',
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
    backgroundColor: '#504AA8',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent:'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default ElecListf;
