import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppStateContext } from '../App.js';
import ImageTile from './ImageTile.jsx';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dzvkuocfb'
  }
});

export default function ProfileScreen() {
  const { users, activeUserIndex } = useContext(AppStateContext);
  console.log('activeUserIndex', activeUserIndex);

  const [images, setImages] = useState([]);

  const [loginUser, setLoginUser] = useState({
    id: 1,
    firstname: 'User 1',
    profileImage: require('../assets/eggplant.jpg'),
    images: images,
  },);

  const updateUsersImage = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === activeUserIndex) {
        users[i].images = loginUser.images;
      }
    }
    console.log('users ', users);
  }

  useEffect(() => updateUsersImage(), [images]);


  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 5
    });
    if (result) {
      let data = result.assets;
      if (data) {
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
        // console.log('temp before', temp);
        temp.images.push(data.public_id);
        // console.log('temp after', temp);
        setImages(temp.images);
      })
  }

  return (
    <SafeAreaView >
      <View style={styles.userContainer}>
        <Image source={loginUser.profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{loginUser.firstname}</Text>
      </View>
      <View>
        <Button
          onPress={handleChoosePhoto}
          title="Upload Image"
          style={styles.button}
        />
        <Menu style={{ height: 50 }}>
          <MenuTrigger text='Switch Account' customStyles={triggerStyles}/>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => alert(`Delete`)} >
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
        </Menu>

      </View>
      {images.length > 0 && (
        <View>
          {
            images.map((public_id, index) => {
              console.log('here?????????', public_id);
              const myImage = cld.image(public_id);
              return <AdvancedImage cldImg={myImage} style={{ width: 200, height: 200 }} key={index} />
            })
          }
        </View>
      )}
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

const triggerStyles = {
  triggerText: {
    color: 'white',
    fontSize: 16,

  },
  triggerOuterWrapper: {
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};