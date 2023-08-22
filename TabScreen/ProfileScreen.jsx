import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppStateContext } from '../App.js';
import ImageTile from './ImageTile.jsx';

export default function ProfileScreen() {
  const { users, activeUserIndex } = useContext(AppStateContext);
  console.log('activeUserIndex', activeUserIndex);

  const [loginUser, setLoginUser] = useState({
    id: 1,
    firstname: 'User 1',
    profileImage: require('../assets/eggplant.jpg'),
    images: [],
  },);
  const [images, setImages] = useState([]);

  const updateUsersImage = () => {

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === activeUserIndex) {
        users[i].images = loginUser.images;
      }
    }
    console.log('users ', users);
  }

  useEffect(()=>updateUsersImage(), [loginUser])


  const uploadImage = () => {
    handleChoosePhoto();
  }
  const switchAccount = () => {


  }
  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 5
    });
    if (result) {
      let data = result.assets;
      console.log('choosephoto result', data);
      // setImages(result.assets);
      data.forEach((imageInfo) => {
        let file = {
          uri: imageInfo.uri,
          type: imageInfo.type,
          name: imageInfo.fileName
        }
        handleUpload(file);
      })
    }
  }

  const handleUpload = (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'moment');
    data.append('cloud_name', 'dzvkuocfb');

    fetch("https://api.cloudinary.com/v1_1/dzvkuocfb/image/upload", {
      method: 'post',
      body: data
    }).then(res => res.json())
      .then(data => {
        console.log('cloudinary data', data);
        let temp = loginUser;
        temp.images.push(data.public_id);
        setLoginUser(temp);
      })
  }

  console.log('loginUser', loginUser);

  return (
    <SafeAreaView >
      <View style={styles.userContainer}>
        <Image source={loginUser.profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{loginUser.firstname}</Text>
      </View>
      <View>
        <Button
          onPress={uploadImage}
          title="Upload Image"
          style={styles.button}
        />
        <Button onPress={switchAccount} title="Switch account" />
      </View>
      <ImageTile loginUser={loginUser} />

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center'
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 2,
  }

});


// var formData = new FormData();
//       formData.append('file', fileElem.files[i]);
//       formData.append('upload_preset', 'fec-cars');
//       // using cloudinary as a third party host database for images
//       var options = {
//         url: 'https://api.cloudinary.com/v1_1/fec-cars/image/upload',
//         method: 'POST',
//         data: formData
//       };
//       axios(options)
//         .then(({ data }) => {
//           //setImagesURL(imagesURL.concat(data.url));
//           imageArr.push(data.url);
//         })
//         .catch(err => console.log(err));