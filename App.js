import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from './screen/home';
import Depense from './screen/depence';
import Electricite from './screen/electricite';
import Materiel from './screen/materiel';
import Note from './screen/note';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          initialRouteName="Home" // Set the initial route name to 'Home'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let iconColor;

              if (route.name === 'Depense') {
                iconName = focused ? 'cash' : 'cash-outline';
                iconColor = focused ? '#76CE9E' : 'black'; // Couleur rouge pour Depense
              } else if (route.name === 'Home') {
                iconName = focused ? 'notifications' : 'notifications-outline';
                iconColor = focused ? '#F9C877' : 'black'; // Couleur verte pour Home
              } else if (route.name === 'Materiel') {
                iconName = focused ? 'bed' : 'bed';
                iconColor = focused ? '#7B6945' : 'black'; // Couleur orange pour Materiel
              } else if (route.name === 'Note') {
                iconName = focused ? 'document' : 'document-outline';
                iconColor = focused ? '#EBC475' : 'black'; // Couleur violette pour Note
              } else if (route.name === 'Electricite') {
                iconName = focused ? 'flash' : 'flash-outline';
                iconColor = focused ? '#504AA8' : 'black'; // Couleur bleue pour Electricite
              }

              return <Ionicons name={iconName} size={size} color={iconColor} />;
            },
            tabBarStyle: {
              backgroundColor: 'white',
            },
            tabBarLabel: () => null, // Masquer l'étiquette pour tous les onglets
          })}
        >
         
         <Tab.Screen name="Electricite" component={Electricite} options={{ headerShown: false }} />
         <Tab.Screen name="Depense" component={Depense} options={{ headerShown: false }} />
          
          <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Tab.Screen name="Materiel" component={Materiel} options={{ headerShown: false }} />
          
          <Tab.Screen name="Note" component={Note} options={{ headerShown: false }} />
        </Tab.Navigator>
        <StatusBar style="light" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
});
