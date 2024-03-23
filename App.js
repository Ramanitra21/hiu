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
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Depense') {
                iconName = focused ? 'cash' : 'cash-outline'; // Icone argent pour Depense
              } else if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Materiel') {
                iconName = focused ? 'tv' : 'tv-outline'; // Icone téléphone pour Materiel
              } else if (route.name === 'Note') {
                iconName = focused ? 'pencil' : 'pencil-outline'; // Icone de note pour Note
              } else if (route.name === 'Electricite') {
                iconName = focused ? 'flash' : 'flash-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
            tabBarStyle: {
              backgroundColor: 'white',
            },
            tabBarLabel: () => null, // Masquer l'étiquette pour tous les onglets
          })}
        >
          <Tab.Screen name="Home" component={Home} options={{ headerShown: true }} />
          <Tab.Screen name="Note" component={Note} options={{ headerShown: true }} />
          <Tab.Screen name="Materiel" component={Materiel} options={{ headerShown: false }} />
          <Tab.Screen name="Electricite" component={Electricite} options={{ headerShown: true }} />
          <Tab.Screen name="Depense" component={Depense} options={{ headerShown: true }} />
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
