import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Balance, Expense, TotalAmount } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';
import Card from '../components/UI/Card';

function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmountByMonth, setTotalAmountByMonth] = useState<TotalAmount>({
    totalBalance: 0,
    totalExpense: 0
  });

  const db = useSQLiteContext();

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
      </View>
      <ScrollView style={styles.scrollContainer}>
        <ExpensesList
          balances={balances}
          expenses={expenses}
          deleteExpense={deleteExpense}
        />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignContent: 'center',
    marginLeft: 10,
    marginVertical: 10,
  },
  text: {
    fontWeight: '700',
    color: '#127350',
    fontSize: 16,
  },
});

export default Home;
