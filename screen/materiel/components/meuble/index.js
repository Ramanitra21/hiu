import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Meuble from '../../../../materialData/meuble';

const MeubleList = () => {
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
    // Clear input fields after adding
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
  };

  return (
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
          <Text style={styles.formTitle}>Ajouter un nouveau meuble</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={newMeuble.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Marque"
            value={newMeuble.brand}
            onChangeText={text => handleInputChange('brand', text)}
          />
          <TouchableOpacity onPress={() => showDatePicker('purchaseDate')}>
            <Text style={styles.dateText}>Date d'achat: {newMeuble.purchaseDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('warrantyDate')}>
            <Text style={styles.dateText}>Date de garantie: {newMeuble.warrantyDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showDatePicker('expirationDate')}>
            <Text style={styles
.dateText}>Date d'expiration: {newMeuble.expirationDate}</Text>
</TouchableOpacity>
<TextInput
  style={styles.input}
  placeholder="Emplacement"
  value={newMeuble.location}
  onChangeText={text => handleInputChange('location', text)}
/>
<TextInput
  style={styles.input}
  placeholder="Catégorie"
  value={newMeuble.category}
  onChangeText={text => handleInputChange('category', text)}
/>
<TouchableOpacity style={styles.addButton} onPress={handleAddMeuble}>
  <Text style={styles.addButtonText}>Ajouter le meuble</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.backButton} onPress={() => setIsAddingNewMeuble(false)}>
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
<TouchableOpacity style={styles.floatingButton} onPress={() => setIsAddingNewMeuble(true)}>
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
backgroundColor: '#CD8A3E',
borderRadius: 30,
width: 60,
height: 60,
justifyContent: 'center',
alignItems: 'center',
elevation: 3,
},
});

export default MeubleList;
