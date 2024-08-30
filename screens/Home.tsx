import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView,StyleSheet, ScrollView} from 'react-native'
import { Balance, Expense } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';
import Card from '../components/UI/Card';

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
      <Text>Home</Text>
      <ScrollView>
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
    
  }
});

export default Home
