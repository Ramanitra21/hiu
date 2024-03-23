import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
export default function Depense() {
  const [budget, setBudget] = useState(1280720); // Initial budget
  const [newProduct, setNewProduct] = useState(""); // State for the name of the new product
  const [newProductPrice, setNewProductPrice] = useState(""); // State for the price of the new product
  const [newProductDescription, setNewProductDescription] = useState(""); // State for the description of the new product
  const [transactions, setTransactions] = useState([]); // State for storing transactions
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility

  useEffect(() => {
    // Fake data to be displayed by default
    const defaultTransactions = [
      { id: 1, item: "Téléviseur", category: "Électronique", price: 500000, description: "Nouveau téléviseur pour le salon" },
      { id: 2, item: "Canapé", category: "Mobilier", price: 800000, description: "Canapé confortable pour la salle de séjour" },
      // Add more fake data as needed
    ];
    setTransactions(defaultTransactions);
  }, []);

  const handleAddProduct = () => {
    // Check if the new product price is valid
    const price = parseInt(newProductPrice);
    if (!isNaN(price) && price > 0) {
      // Update the budget
      const updatedBudget = budget - price;
      if (updatedBudget >= 0) {
        setBudget(updatedBudget);
        // Add the new product to transactions
        const newTransaction = { item: newProduct, price: price, description: newProductDescription };
        setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
        // Clear the input fields
        setNewProduct("");
        setNewProductPrice("");
        setNewProductDescription("");
        // Close the modal
        setModalVisible(false);
      } else {
        alert("Le budget n'est pas suffisant !");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View style={styles.container}>
          {/*--------------------------- Card du nav bar --------------------------- */}
          <View
            style={{
              backgroundColor: "#76CE9E",
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
              <View style={{ width: "40%" }}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 21 }}
                >
                  Dépense
                </Text>
                <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>
                  La somme restante pour notre maison
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginTop: 5,
                    fontWeight: "bold",
                    fontSize: 21,
                    width: 200,
                  }}
                >
                  {budget} Mga
                </Text>
              </View>
              <View
                style={{ position: "absolute", top: -70, right: 0, bottom: 150 }}
              >
                <Image
                  source={require("./images/depense.png")}
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
                  backgroundColor: "#F9C877",
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
                  borderColor: "white",
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
              <Text
                style={{ color: "#76CE9E", fontWeight: "bold", fontSize: 16 }}
              >
                Dépense
              </Text>
              <Text style={{ color: "#76CE9E", marginLeft: 5, fontSize: 16 }}>
                dans la maison
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#76CE9E",
                width: 100,
                height: 1,
                marginTop: 3,
                borderColor: "white",
              }}
            ></View>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{ position: "absolute", right: 20 }}
            >
              <Image
                source={require("./images/plus.png")}
                style={{ width: 30, height: 30, color: "black" }}
              />
            </TouchableOpacity>
          </View>

          {/* Display transactions */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Transactions :</Text>
            {transactions.map((transaction, index) => (
              <View key={index} style={styles.container}>
                 <Text style={styles.name}>{transaction.item}</Text>
                <Text >{transaction.price} Mga</Text>
                <Text style={styles.name2}>{transaction.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating button to add new product */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.floatingButton}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal for adding new product */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>Ajouter un nouveau produit :</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setNewProduct(text)}
            value={newProduct}
            placeholder="Nom du nouveau produit"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNewProductPrice(text)}
            value={newProductPrice}
            keyboardType="numeric"
            placeholder="Prix du nouveau produit"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setNewProductDescription(text)}
            value={newProductDescription}
            placeholder="Description du nouveau produit"
          />
          <TouchableOpacity
            onPress={handleAddProduct}
            style={styles.addButton}
          >
            <Text style={{ color: "white" }}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginHorizontal: "4%",
    marginTop: 45,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#76CE9E",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
    width: 200,
  },
  addButton: {
    backgroundColor: "#76CE9E",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
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
});
