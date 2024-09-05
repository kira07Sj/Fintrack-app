import React from 'react'
import { View, Text , StyleSheet} from 'react-native'
import { Balance } from '../../types'

interface CardBalanceProps
{
    balanceInfo: Balance;
}

const CardBalance = ({balanceInfo}: CardBalanceProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.Name}>{balanceInfo.name}</Text>
      <View style={styles.innerText}>
        <Text style={styles.amount}>{balanceInfo.amount}</Text>
        <Text style={styles.birr}>birr</Text>
      </View>
    </View>
  )
}

export default CardBalance

const styles = StyleSheet.create({
    card:{
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        height: 80,
        backgroundColor: 'white',
        marginLeft: 10,
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
        
    }
})