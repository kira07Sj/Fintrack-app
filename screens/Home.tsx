import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView,StyleSheet, ScrollView} from 'react-native'
import { Balance, Expense } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';


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
  }

  async function deleteExpense(id:number) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM expense WHERE id = ?;`, [id])
    })
    await getData();
  }

  return (
    <SafeAreaView style={styles.container}>
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
    marginVertical:30,
    
  }
});

export default Home
