import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView,StyleSheet, ScrollView} from 'react-native'
import { Balance, Expense } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';
import Card from '../components/UI/Card';
import CardExpense from '../components/UI/CardExpense';

function Home(){

  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const db = useSQLiteContext();

  useEffect(()=>{
    db.withTransactionAsync(async () => {
      await getData();
    })
  }, [db])

  async function getData() {
    const expenseResult = await db.getAllAsync<Expense>(`SELECT * FROM expense order by date`); 
    setExpenses(expenseResult);

    const balanceResult = await db.getAllAsync<Balance>(`SELECT * FROM balance`); 
    setBalances(balanceResult);
  }

  async function deleteExpense(id:number) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM expense WHERE id = ?;`, [id])
    })
    await getData();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card/>
      <View style={styles.btnArea}>
      <Text style={styles.text}>Expenses</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <ExpensesList
          balances={balances}
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical:10,
  },
  scrollContainer:{
    height:'50%'
  },
  btnArea:{
    width:300,
    height:30,
    display:'flex',
    justifyContent:'space-between',
    alignContent:'center',
    marginLeft:10,
    marginVertical:10
  },
  text:{
    fontWeight:'700',
    color:'#127350',
    fontSize:16
  }

});

export default Home
