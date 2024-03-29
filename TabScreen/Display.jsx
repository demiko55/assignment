import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AppStateContext } from '../App.js';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import Like from './Like.jsx';


const cld = new Cloudinary({
  cloud: {
    cloudName: 'dzvkuocfb'
  }
});

export default Display = () => {
  const { clickedUserIndex, users } = useContext(AppStateContext);

  // console.log('clickedUserIndex in Display', clickedUserIndex);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === clickedUserIndex) {
        setUserInfo(users[i]);
      }
    }
  }, []);

  // console.log("userInfo", userInfo);

  if (userInfo === undefined || userInfo.images === undefined) {
    return (
      <Text>
        'no userInfo'
      </Text>
    );
  } else {
    return (
      <SafeAreaView>
        <View style={styles.userContainer}>
          <Image source={userInfo.profileImage} style={styles.profileImage} />
          <Text style={styles.username}>{userInfo.firstname}</Text>
        </View>
        {
          <View style={styles.row}>
            {
              userInfo.images.map((public_id) => {
                const myImage = cld.image(public_id);
                return (
                  <View key={public_id}>
                    <AdvancedImage cldImg={myImage} style={styles.image} />
                    <Like />
                  </View>
                )
              })
            }
          </View>
        }

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
  row: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Align children vertically in the middle
    justifyContent: 'flex-start', // Distribute children evenly along the main axis
    flexWrap: 'wrap'
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
  },
});