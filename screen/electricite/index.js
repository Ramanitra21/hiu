import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, StatusBar } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import Elec from '../../materialData/electric';

export default function Electricite() {
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
    dailyUsageHours: ''
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
      dailyUsageHours: ''
    });
    setIsAddingNewElec(false);
  };

  return (
    <View >
        <ScrollView contentContainerStyle={styles.container}>
        <View style={{
          marginTop:'10%',
          marginHorizontal:'2%'
        }}>
        {/*--------------------------- Text au top du nav bar --------------------------- */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: "56%" }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              la consommation d’électricité approximative ⚡{" "}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "5%",
              backgroundColor: "#504AA8",
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
        {/*--------------------------- Card du nav bar --------------------------- */}
        <View
          style={{
            backgroundColor: "#757FAE",
            marginTop: 42,
            padding: 20,
            borderRadius: 9,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ width: "38%" }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 21 }}
              >
                Electricité
              </Text>
              <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>
                La consommation approximative
              </Text>
              <Text
                style={{
                  color: "white",
                  marginTop: 5,
                  fontWeight: "bold",
                  fontSize: 21,
                  width:250
                }}
              >
                28.720 Mga
              </Text>
            </View>
            <View
              style={{ position: "absolute", top: -70, right: 0, bottom: 150 }}
            >
              <Image
                source={require("./images/houseElec.png")}
                style={{ width: 160, height: 160 }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 9,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#504AA8",
                paddingHorizontal: 12,
                paddingVertical: 7,
                borderRadius: 11,
              }}
            >
              <Text style={{ color: "white" }}>Matériel interne</Text>
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
        {/*--------------------------- Apres le nav bar --------------------------- */}

        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: "2%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 19 }}>
              Matériel
            </Text>
            <Text style={{ color: "white", marginLeft: 5, fontSize: 19 }}>
              électrique
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              width: 115,
              height: 1,
              marginTop: 3,
              bordeColor: "white",
            }}
          ></View>
          <Image
            source={require("./images/info.png")}
            style={{ width: 15, height: 15 }}
          />
        </View>

        <StatusBar style="auto" />
      </View>
      <View style={{
        marginTop:'5%',
        flexDirection:'row',
      }}>
      <View style={{
        width: 2,
        height: '100%',
        backgroundColor: 'white',
        marginLeft:'4%'
      }}>

      </View>
      <View style={{
        marginHorizontal:'5%',
        marginTop:'3%'
      }}>
      {!isAddingNewElec ? (
        elecs.map(elec => (
          <View key={elec.id} style={styles.elecContainer}>
            <Text style={styles.name}>{elec.appliance}</Text>
            <Text >L'appareil se trouve dans la pièce : {elec.location}</Text>
            <Text >Consommation d'énergie: </Text>
            <Text style={styles.name2}>{elec.energyConsumption}</Text>
            <Text >Durée de fonctionnement quotidienne: </Text>
            <Text style={styles.name2}>{elec.dailyUsageHours} heures/jours</Text>
          </View>
        ))
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add New Elec</Text>
          <TextInput
            style={styles.input}
            placeholder="Appliance"
            value={newElec.appliance}
            onChangeText={text => handleInputChange('appliance', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Daily Usage Hours"
            value={newElec.dailyUsageHours}
            onChangeText={text => handleInputChange('dailyUsageHours', text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddElec}>
            <Text style={styles.addButtonText}>Add Elec</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsAddingNewElec(false)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>

      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      
    </ScrollView>
    <TouchableOpacity style={styles.floatingButton} onPress={() => setIsAddingNewElec(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#9C9FAB",
    padding: 10,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  profileIcon: {
    marginLeft: "5%",
    backgroundColor: "#504AA8",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    marginTop: 15,
  },
  profileImage: {
    width: 15,
    height: 15,
  },
  cardContainer: {
    backgroundColor: "#757FAE",
    marginTop: 42,
    padding: 20,
    borderRadius: 9,
  },
  cardContent: {
    flexDirection: "row",
  },
  cardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
  },
  cardSubtitle: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
  cardValue: {
    color: "white",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 21,
  },
  cardImageContainer: {
    position: "absolute",
    top: -70,
    right: 0,
    bottom: 150,
  },
  cardImage: {
    width: 160,
    height: 160,
  },
  cardFooter: {
    flexDirection: "row",
    marginTop: 9,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardButton: {
    backgroundColor: "#504AA8",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 11,
  },
  cardButtonText: {
    color: "white",
  },
  divider: {
    backgroundColor: "white",
    width: 135,
    height: 1,
    borderColor: "white",
  },
  infoIcon: {
    width: 15,
    height: 15,
  },
  elecContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#504AA8",
  },
  name2: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#504AA8",
  },
  formContainer: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#504AA8",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
