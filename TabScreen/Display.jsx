import React, {useContext, useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {AppStateContext} from '../App.js';
import ImageTile from './ImageTile.jsx';


export default Display  = ()=>{
  const {clickedUserIndex, users} = useContext(AppStateContext);

  console.log('clickedUserIndex in Display', clickedUserIndex);

  const [userInfo, setUserInfo] = useState({});

  useEffect(()=>{
    for(let i = 0; i<users.length; i++){
      if(users[i].id === clickedUserIndex){
        setUserInfo(users[i]);
      }
    }
  }, []);

  console.log("userInfo", userInfo.images);

  if (userInfo === undefined || userInfo.images === undefined) {
    return (
      <Text>
      'no userInfo'
      </Text>
    );
  } else{
    return (
      <SafeAreaView>
        <View style={styles.userContainer}>
          <Image source={userInfo.profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{userInfo.firstname}</Text>
        </View>
      </SafeAreaView>
    )
  }


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