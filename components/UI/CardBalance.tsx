import React from 'react'
import { View, Text , StyleSheet, SafeAreaView} from 'react-native'
import { Balance } from '../../types'
import { useTheme } from '../../Hooks/ThemeProvider '


interface CardBalanceProps
{
    balanceInfo: Balance;
}

const CardBalance = ({balanceInfo}: CardBalanceProps) => {

  const { isDarkMode } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card,isDarkMode ? styles.Darkmode : styles.lightMode]}>
      <Text style={[styles.Name,isDarkMode ? styles.darkModeText : styles.lightMode]}>{balanceInfo.name}</Text>
      <View style={styles.innerText}>
        <Text style={[styles.amount,isDarkMode ? styles.darkModeText : styles.lightMode]}>{balanceInfo.amount}</Text>
        <Text style={[styles.birr,isDarkMode ? styles.darkModeText : styles.lightMode]}>birr</Text>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default CardBalance

const styles = StyleSheet.create({
  container:{
      display:'flex',
      paddingHorizontal:10
  },
    card:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#22D293',
        borderWidth:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom:10
    },
    innerText:
    {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        gap: 4
    },
    Name:{
        fontSize: 20,
        color: '#127350',
        fontWeight: 'bold'
    },
    amount:{
        fontSize: 22,
        color: '#127350',
        fontWeight: 'bold'
    },
    birr:{
        fontSize: 16,
        color: '#127350',
        
    },
    lightMode:{
      
    },
    Darkmode:{
      backgroundColor:'#1F1F1F',
      borderColor:'#1BCA8B'
    },
    darkModeText:
    {
      color:'#1BCA8B',
    },
    darkModeUnderLine:{
      borderBottomColor: '#1BCA8B'
    }
})