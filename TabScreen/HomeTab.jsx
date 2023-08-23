import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppStateContext } from '../App.js';

export default function HomeTab({ navigation }) {
  const { users, activeUserIndex, setClickUserIndex, clickedUserIndex, otherUsers, setOtherUsers } = useContext(AppStateContext);
  // console.log('users', users);
  // console.log('otherUsers', otherUsers);

  const handleOtherUsers = ()=>{
    const temp = [...users];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === activeUserIndex) {
        temp.splice(i, 1);
      }
    }
    setOtherUsers(temp);
  }

  useEffect(() => handleOtherUsers(), [activeUserIndex]);

  const handleDisplay = (id) => {
    setClickUserIndex(id);
    navigation.navigate('Display');
  }
  // console.log('clickedUserIndex', clickedUserIndex);

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <TouchableOpacity onPress={() => handleDisplay(item.id)}>
        <View style={styles.userContainer}>
          <Image source={item.profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{item.firstname}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
  return (
    <FlatList
      data={otherUsers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  )

}


const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
  },
});