import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Maintenance from '../../../../materialData/infrastructure';

const MaintenanceList = () => {
  const [newMaintenance, setNewMaintenance] = useState({
    objectName: '',
    task: '',
    description: '',
    frequency: '',
    lastDate: '',
    nextDate: '',
    location: '',
    category: ''
  });

  const [maintenances, setMaintenances] = useState(Maintenance);
  const [isAddingNewMaintenance, setIsAddingNewMaintenance] = useState(false);

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
    setNewMaintenance({ ...newMaintenance, [selectedDateKey]: date.toISOString().split('T')[0] });
    hideDatePicker();
  };

  const handleInputChange = (key, value) => {
    setNewMaintenance({ ...newMaintenance, [key]: value });
  };

  const handleAddMaintenance = () => {
    const updatedMaintenances = [...maintenances, newMaintenance];
    setMaintenances(updatedMaintenances);
    // Clear input fields after adding
    setNewMaintenance({
      objectName: '',
      task: '',
      description: '',
      frequency: '',
      lastDate: '',
      nextDate: '',
      location: '',
      category: ''
    });
    setIsAddingNewMaintenance(false);
  };

  return (
    <View style={styles.container}>
      {!isAddingNewMaintenance ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {maintenances.map(maintenance => (
            <View key={maintenance.id} style={styles.maintenanceContainer}>
              <Text style={styles.name}>{maintenance.objectName}</Text>
              <Text>Tâche: {maintenance.task}</Text>
              <Text>Description: {maintenance.description}</Text>
              <Text>Fréquence: {maintenance.frequency}</Text>
              <Text>Dernière date: {maintenance.lastDate}</Text>
              <Text>Prochaine date: {maintenance.nextDate}</Text>
              <Text>Emplacement: {maintenance.location}</Text>
              <Text>Catégorie: {maintenance.category}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.formTitle}>Ajouter une nouvelle maintenance</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom de l'objet"
            value={newMaintenance.objectName}
            onChangeText={text => handleInputChange('objectName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tâche"
            value={newMaintenance.task}
            onChangeText={text => handleInputChange('task', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newMaintenance.description}
            onChangeText={text => handleInputChange('description', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fréquence"
            value={newMaintenance.frequency}
            onChangeText={text => handleInputChange('frequency', text)}
          />
          <TouchableOpacity onPress={() => showDatePicker('lastDate')}>
            <Text style={styles.dateText}>Dernière date: {newMaintenance.lastDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('nextDate')}>
            <Text style={styles.dateText}>Prochaine date: {newMaintenance.nextDate}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Emplacement"
            value={newMaintenance.location}
            onChangeText={text => handleInputChange('location', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Catégorie"
            value={newMaintenance.category}
            onChangeText={text => handleInputChange('category', text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddMaintenance}>
            <Text style={styles.addButtonText}>Ajouter la maintenance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsAddingNewMaintenance(false)}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setIsAddingNewMaintenance(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#CFA875',
  },
  maintenanceContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MaintenanceList;
