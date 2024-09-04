import React from 'react'
import { StyleSheet, View, Text, ImageBackground} from 'react-native'

function Header(){
  return (
    <View style ={styles.container}>
      <ImageBackground
          source={require('../assets/logo.png')}
          style={styles.img}
      ></ImageBackground>
      <ImageBackground
      source={require('../assets/more.png')}
      style={styles.more}
      >

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height:25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:50,
      marginBottom:30,
    },
    img:{
      width:120,
    },
    more:
  {
    width: 35,
    marginRight: 5
  }
  });

export default Header
