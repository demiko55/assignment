import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Display from './Display.jsx';
import HomeTab from './HomeTab.jsx';


const HomeStack = createNativeStackNavigator();

export default function HomeScreen() {

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }}/>
      <HomeStack.Screen name = "Display" component = {Display} />
    </HomeStack.Navigator>
  );
}

