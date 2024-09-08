import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import { useState } from 'react';
import MenuOverlay from './MenuOverlay';

function Header(){
  
  
  const [isOverlay, setIsOverlay] = useState(false);

  function submit(){

  }

  return (
    <View style ={styles.container}>
      <ImageBackground
          source={require('../assets/logo.png')}
          style={styles.img}
      ></ImageBackground>
      <TouchableOpacity  onPress={()=>setIsOverlay(true)}>
        <ImageBackground
        source={require('../assets/more.png')}
        style={styles.more}/>
      </TouchableOpacity>

      <MenuOverlay
        visible={isOverlay}
        onClose={()=> setIsOverlay(false)}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height:65,
      flexDirection: 'row',
      justifyContent: 'space-between',      
      backgroundColor:'#fff',
      marginTop:30,
      alignItems:'center',
      
    },
    img:{
      width:120,
      height:25
    },
    more:
  {
    width: 35,
    height:35
  }
  });

export default Header
