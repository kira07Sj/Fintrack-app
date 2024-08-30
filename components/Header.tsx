import React from 'react'
import { StyleSheet, View, Text} from 'react-native'

function Header(){
  return (
    <View style ={styles.container}>
      <Text>FinTrack</Text>
      <Text>Menu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height:60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical:50
    }
  });

export default Header
