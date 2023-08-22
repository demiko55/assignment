import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'dzvkuocfb'
    }
});

export default  ImageTile = ({loginUser})=>{
  let images = loginUser.images;
  console.log('image Tile', images);

  if(images){
    return (
      <>
        {
          images.map((public_id, index) => {
            const myImage = cld.image(public_id);
            return <AdvancedImage cldImg={myImage} style={{ width: 300, height: 200 }} key={index}/>
          })
        }
      </>
    )
  }

}