import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import { useState } from 'react';
import MenuOverlay from './MenuOverlay';
import { useTheme } from '../Hooks/ThemeProvider ';

function Header(){
  
  
  const [isOverlay, setIsOverlay] = useState(false);

  const { isDarkMode } = useTheme();


  return (
    <View style ={[styles.container, isDarkMode ? styles.Darkmode : styles.lightMode]}>
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
      height:85,
      flexDirection: 'row',
      justifyContent: 'space-between',  
      paddingTop:40,
      paddingBottom:30,
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
  },
  lightMode:{
    backgroundColor:'white'
  },
  Darkmode:{
    backgroundColor:'#1F1F1F'
  }
  });

export default Header
