import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar, Modal, StyleSheet, Text, View, Image, TouchableOpacity, Button, Platform, TextInput, ActivityIndicator, ScrollView } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
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
    <ScrollView style={{ width: '100%' }}>
      <View style={{ flex: 1, backgroundColor: "#F4EFF0" }}>
        <View style={styles.container}>
          {/*--------------------------- Card du nav bar --------------------------- */}
          <View
            style={{
              backgroundColor: "#EBC475",
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
                  Note de la maison
                </Text>
                <Text style={{ color: "white", marginTop: 5, fontSize: 14 }}>
                  Rappel des notes importante
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: -70,
                  right: -15,
                  bottom: 150,
                }}
              >
                <Image
                  source={require("./image/note.png")}
                  style={{ width: 180, height: 180 }}
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
                  backgroundColor: "#DA9752",
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
                source={require("./image/info.png")}
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
                style={{ color: "#DA9752", fontWeight: "bold", fontSize: 16 }}
              >
                Note
              </Text>
              <Text style={{ color: "#DA9752", marginLeft: 5, fontSize: 16 }}>
                importante
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#DA9752",
                width: 140,
                height: 1,
                marginTop: 3,
                bordeColor: "white",
              }}
            ></View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                source={require("./image/plus.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>

          {notifications.slice(0).reverse().map((notification, index) => (
          <Card key={index} style={{ margin: 10, padding: 10, backgroundColor: '#f0f0f0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => handleDeleteNotification(index)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{notification?.request?.content?.title || 'No title'}</Text>
              <Text>{notification?.request?.content?.body || 'No body'}</Text>
              <Text>Date prévue: {new Date(notification?.request?.trigger?.date).toLocaleString()}</Text>
            </View>
            
          </Card>
          ))}

          <StatusBar style="auto" />
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Card style={{ padding: 20, marginBottom: 20, width: '100%', backgroundColor:"#EBC475" }}>
                  <TextInput
                    placeholder="Votre Nom"
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Prénom"
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Titre ou motif"
                    value={notificationTitle}
                    onChangeText={text => setNotificationTitle(text)}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Description"
                    value={notificationDescription}
                    onChangeText={text => setNotificationDescription(text)}
                    style={styles.input}
                  />
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text>{selectedDate.toLocaleDateString()}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={(event, date) => {
                        setShowDatePicker(false);
                        if (date !== undefined) {
                          setSelectedDate(date);
                        }
                      }}
                    />
                  )}
                  <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text>{selectedDate.toLocaleTimeString()}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={selectedDate}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(event, time) => {
                        setShowTimePicker(false);
                        if (time !== undefined) {
                          const newDate = new Date(selectedDate);
                          newDate.setHours(time.getHours());
                          newDate.setMinutes(time.getMinutes());
                          setSelectedDate(newDate);
                        }
                      }}
                    />
                  )}
                  <ActivityIndicator
                    animating={isLoading}
                    size="large"
                    color="#0000ff"
                    style={{ marginBottom: 10 }}
                  />
                  <Button
                    color={'#DA9752'}
                    title="Press to schedule a notification"
                    onPress={async () => {
                      setModalVisible(!modalVisible);
                      if (!firstName || !lastName || !notificationTitle || !notificationDescription) {
                        alert('Please fill in all fields.');
                        return;
                      }
                      setIsLoading(true);
                      await schedulePushNotification();
                      setIsLoading(false);
                    }}
                  />
                </Card>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EFF0",
    marginHorizontal: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40%"
  },
  modalView: {
    margin: 20,
    height : 100,
    backgroundColor: "transparent",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor:"white"
  },
});