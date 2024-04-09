import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar, Modal, StyleSheet, Text, View, Image, TouchableOpacity, Button, Platform, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Map from './Map'; // Importer le composant Map

const Stack = createStackNavigator();

export default function AppWithNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationDescription, setNotificationDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token)).catch(error => console.error('Failed to get push token:', error));
    loadNotifications().catch(error => console.error('Error loading notifications:', error));
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Afficher une alerte ou une autre action en cas de réception de notification
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    saveNotifications().catch(error => console.error('Error saving notifications:', error));
  }, [notifications]);

  // Utiliser useFocusEffect pour rafraîchir les notifications lorsque l'écran Home est affiché
  useFocusEffect(
    React.useCallback(() => {
      const refreshNotifications = async () => {
        await loadNotifications();
      };

      refreshNotifications();

      return () => {};
    }, [])
  );

  const loadNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications !== null) {
      setNotifications(JSON.parse(storedNotifications));
    }
  };

  const saveNotifications = async () => {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  };

  async function schedulePushNotification() {
    setIsLoading(true);

    const currentDate = new Date();
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationTitle,
        body: `${notificationDescription} \n - Envoyé par ${firstName} ${lastName} le \n ${currentDate}`,
        data: { data: 'goes here' },
      },
      trigger: { date: selectedDate },
    }).catch(error => console.error('Failed to schedule notification:', error));

    const newNotification = {
      request: {
        content: {
          title: notificationTitle,
          body: `${notificationDescription} \n - Envoyé par ${firstName} ${lastName} le \n ${currentDate}`,
          data: { data: 'goes here' },
        },
        trigger: {
          date: selectedDate.getTime(), // Convertir la date en millisecondes pour la sauvegarde
        }
      },
    };

    setNotifications(prevNotifications => [...prevNotifications, newNotification]);

    setIsLoading(false);
  }

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      console.error('Must use physical device for Push Notifications');
      return;
    }

    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.error('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'e0f1f157-a4e0-48fc-aa11-0602a7b882c6' })).data;

    return token;
  }

  const handleDeleteNotification = async (index) => {
    // Créer une copie de la liste de notifications
    const updatedNotifications = [...notifications];
    
    // Supprimer la notification correspondant à l'index spécifié
    updatedNotifications.splice(index, 1);
  
    // Mettre à jour l'état avec la nouvelle liste de notifications
    setNotifications(updatedNotifications);
  
    try {
      // Enregistrer les modifications dans le stockage AsyncStorage
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#CFA875" }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Votre code existant */}
          <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <MaterialIcons name="light" size={25} color="#848B66" />
          </TouchableOpacity>
          {/* Votre code existant */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFA875",
    marginHorizontal: '4%',
    marginTop: 45,
  },
});
