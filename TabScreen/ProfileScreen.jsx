import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { AppStateContext } from '../App.js';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


const cld = new Cloudinary({
  cloud: {
    cloudName: 'dzvkuocfb'
  }
});

export default function ProfileScreen() {
  const { users, setUsers, activeUserIndex, otherUsers, setActiveUserIndex } = useContext(AppStateContext);

  // console.log('otherUsers', otherUsers);

  // console.log('activeUserIndex', activeUserIndex);

  const [images, setImages] = useState([]);

  const [loginUser, setLoginUser] = useState({
    id: 1,
    firstname: 'User 1',
    profileImage: require('../assets/eggplant.jpg'),
    images: [],
  },);
  //images每次发生变化时，更新User 中的图片信息images
  const updateUser = () => {
    let tempUsers = [...users];
    for (let i = 0; i < users.length; i++) {
      if (tempUsers[i].id === activeUserIndex) {
        tempUsers[i].images = images;
        console.log('tempUserusers[i]', tempUsers[i]);
        setLoginUser(tempUsers[i]);
        setUsers(tempUsers);
      }
    }
  }
  useEffect(() => updateUser(), [images]);

  //activeIndex变化时，则更新整个loginUser
  const updateLoginUser = () => {
    let tempLoginUser = {};
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === activeUserIndex) {
        tempLoginUser = users[i];
      }
    }
    setLoginUser(tempLoginUser);
    setImages(tempLoginUser.images);
  }
  useEffect(() => updateLoginUser(), [activeUserIndex]);

  console.log('LoginUSer', loginUser);

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
          handleUpload(file);//setTimeout()
        })
      }
    }
  }

  //when uploaded multi images at the same time, it will store all the imgs info. When reclicked the upload button, uploadedImgs will be [] again.
  const uploadedImgs = [];
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
        uploadedImgs.push(data.public_id);
        console.log('uploadedImgs', uploadedImgs);
        //uploaded multi images will call fetch methods multi times.It will be called the second time before the first time call has a response
        console.log('images before', images);
        setImages([...uploadedImgs, ...images]);
      })
  }

  const handleSwtich = (targetUser) => {
    setActiveUserIndex(targetUser.id);
  }

  console.log('images', images);


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
          <MenuTrigger text='Switch Account' customStyles={triggerStyles} />
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={() => handleSwtich(otherUsers[0])} text={otherUsers[0].firstname} />
            <MenuOption onSelect={() => handleSwtich(otherUsers[1])} text={otherUsers[1].firstname} />
            <MenuOption onSelect={() => handleSwtich(otherUsers[2])} text={otherUsers[2].firstname} />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.row}>
        {images.length > 0 &&
          images.map((public_id) => {
            console.log('here?????????', public_id);
            const myImage = cld.image(public_id);
            return (
              <View key={public_id}>
                <AdvancedImage cldImg={myImage} style={styles.image} />
              </View>
            )
          })
        }
      </View>
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
  button:{
    flex:1,
    width:100,
    backgroundColor:'blue'
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
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style: {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginTop: 50
  },
  optionsWrapper: {
    // backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'green',
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