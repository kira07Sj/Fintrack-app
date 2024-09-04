import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Balance, Expense, TotalAmount } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';
import Card from '../components/UI/Card';
import InsertionOverlay from '../components/InsertionOverlay';


function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmountByMonth, setTotalAmountByMonth] = useState<TotalAmount>({
    totalBalance: 0,
    totalExpense: 0
  });

  const db = useSQLiteContext();
  const [isOverlay, setIsOverlay] = useState(false);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const expenseResult = await db.getAllAsync<Expense>(`SELECT * FROM expense ORDER BY date`);
    setExpenses(expenseResult);

    // Correct way to handle SUM query result
    const expenseSumResult = await db.getAllAsync<{ totalExpense: number }>(`SELECT SUM(amount) as totalExpense FROM expense`);
    const totalExpense = expenseSumResult[0]?.totalExpense || 0; // Accessing the first item of the result array

    const balanceResult = await db.getAllAsync<Balance>(`SELECT * FROM balance`);
    setBalances(balanceResult);

    // Correct way to handle SUM query result
    const balanceSumResult = await db.getAllAsync<{ totalBalance: number }>(`SELECT SUM(amount) as totalBalance FROM balance`);
    const totalBalance = balanceSumResult[0]?.totalBalance || 0; // Accessing the first item of the result array

    setTotalAmountByMonth({
      totalBalance,
      totalExpense
    });
  }

  async function deleteExpense(id: number) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM expense WHERE id = ?;`, [id]);
    });
    await getData();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card totalValue={totalAmountByMonth} />
      <View style={styles.btnArea}>
        <Text style={styles.text}>Expenses</Text>

        <TouchableOpacity style={styles.btn} onPress={() => setIsOverlay(true)}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>       
      </View>
      <ScrollView style={styles.scrollContainer}>
        <ExpensesList
          balances={balances}
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      </ScrollView>

      <InsertionOverlay
        visible={isOverlay}
        onClose={() => setIsOverlay(false)} // Close overlay when Cancel or Submit is pressed
        
        paymentMethodes={balances}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  scrollContainer: {
    height: '50%',
  },
  btnArea: {
    width: 300,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal:10
  },
  text: {
    fontWeight: '700',
    color: '#127350',
    fontSize: 16,
  },
  btn:{
    width:70,
    display: 'flex',
    backgroundColor: '#69FAD7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    elevation: 3
  },
  btnText:
{
  fontSize: 15,
  fontWeight: '700'

}
});

export default Home;
