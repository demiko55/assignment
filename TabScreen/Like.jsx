import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default Like = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <View>
      <TouchableOpacity style={{ marginLeft: 5 }}>
        <Ionicons name={toggle ? "heart" : "heart-outline"} size={18} color='#007AFF' onPress={()=>setToggle(!toggle)}>
          <Text>Like</Text>
        </Ionicons>
      </TouchableOpacity>
    </View>
  )
}