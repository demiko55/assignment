import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'dzvkuocfb'
    }
});

export default  ImageTile = ({imgs})=>{
  useEffect(()=>{
    console.log('image tile', imgs);
  }, [imgs]);
  if(imgs){
    return (
      <View>
        {
          imgs.map((public_id, index) => {
            const myImage = cld.image(public_id);
            return <AdvancedImage cldImg={myImage} style={{ width: 300, height: 200 }} key={index}/>
          })
        }
      </View>
    )
  }

}