import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './TabScreen/HomeScreen.jsx';
import ProfileScreen from './TabScreen/ProfileScreen.jsx';


const Tab = createBottomTabNavigator();
export const AppStateContext = React.createContext();

export default function App() {

  const [activeUserIndex, setActiveUserIndex] = useState(1);
  const [clickedUserIndex, setClickUserIndex] = useState(0);
  const users = [
    {
      id: 1,
      firstname: 'User 1',
      profileImage: require('./assets/eggplant.jpg'),
      images: [],
    },
    {
      id: 2,
      firstname: 'User 2',
      profileImage: require('./assets/waterSpinach.jpeg'),
      images: [],
    },
    {
      id: 3,
      firstname: 'User 3',
      profileImage: require('./assets/celtuce.jpg'),
      images: [],
    },
    {
      id: 4,
      firstname: 'User 4',
      profileImage: require('./assets/chineseKale.jpeg'),
      images: [],
    }
  ];
  const contextValue = {users, activeUserIndex, setActiveUserIndex, clickedUserIndex, setClickUserIndex};

  return (
    <AppStateContext.Provider value={contextValue}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'grey',
          })}
        >
          <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>

    </AppStateContext.Provider>


  );
}
