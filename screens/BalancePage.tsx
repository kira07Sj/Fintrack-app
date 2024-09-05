import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import { Balance } from '../types';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CardBalance from '../components/UI/CardBalance';
import BalanceList from '../components/BalanceList';


function BalancePage(){

  const [balances, setBalances] = useState<Balance[]>([]);
  const db = useSQLiteContext();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);
  
  async function getData() {
    try {
     
      const balanceResult = await db.getAllAsync<Balance>(`SELECT * FROM balance`);
 
      setBalances(balanceResult);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  

async function deleteBalance(id:number) {
  await db.runAsync(`DELETE FROM balance WHERE id = ?`, [id])
  await getData();
}

  return (
    <SafeAreaView style={styles.container}>
      <Text>Balance</Text>
      <ScrollView>
          <BalanceList
              balances={balances} 
              deleteBalance={deleteBalance}      
          />
      </ScrollView>
    </SafeAreaView>
  )
}

export default BalancePage

const styles = StyleSheet.create({
  container:{
    width: '100%',
    marginVertical:10
  }
})