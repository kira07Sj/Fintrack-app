import React from 'react'
import { View, Text, SafeAreaView,StyleSheet} from 'react-native'


function Home(){
  return (
    <SafeAreaView style={styles.container}>
      
      <Text>Home screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical:30
  }
});

export default Home
