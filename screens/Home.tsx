import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Balance, Expense, TotalAmount } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import ExpensesList from '../components/ExpensesList';
import Card from '../components/UI/Card';
import InsertionOverlay from '../components/InsertionOverlay';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../Hooks/ThemeProvider ';

function Home() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAmountByMonth, setTotalAmountByMonth] = useState<TotalAmount>({
    totalBalance: 0,
    totalExpense: 0
  });

  const db = useSQLiteContext();
  const [isOverlay, setIsOverlay] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  useFocusEffect(
    React.useCallback(() => {
      getData(); // Refresh data when the overlay screen is opened
    }, [])
  );

  async function getData() {
    const expenseResult = await db.getAllAsync<Expense>(`SELECT * FROM expense ORDER BY id DESC`);
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
  async function deleteExpense(id: number): Promise<void> {
    try {
      await db.withTransactionAsync(async () => {
        // Fetch the expense details using its ID
        const expenseResult = await db.getAllAsync<{ amount: number; balance_id: number }>(
          `SELECT amount, balance_id FROM expense WHERE id = ?`,
          [id]
        );
  
        // Check if the expense exists before proceeding
        if (expenseResult.length > 0) {
          const { amount, balance_id } = expenseResult[0];
  
          // Update the balance: Add the amount back to the balance of the corresponding payment method
          await db.runAsync(
            `UPDATE balance SET amount = amount + ? WHERE id = ?`,
            [amount, balance_id]
          );
  
          // Delete the expense from the expense table
          await db.runAsync(`DELETE FROM expense WHERE id = ?;`, [id]);
  
          console.log(`Expense ID: ${id} deleted successfully and balance updated.`);
        } else {
          console.warn(`Expense with ID: ${id} not found.`);
        }
      });
  
      // Refresh the data to update the screen after deletion
      await getData();
    } catch (error) {
      console.error('Error deleting expense and updating balance:', error);
    }
  }
  
  

  function handleAddEntry(name: string, amount: number, paymentMethodId: number, date: string) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO expense (name, amount, date, balance_id) VALUES (?, ?, ?, ?);`,
        [name, amount, date, paymentMethodId] // Include date in the insertion
      );

      await db.runAsync(
        `UPDATE balance SET amount = amount - ? WHERE id = ?`,
        [amount, paymentMethodId]
      );

      await getData(); // Refresh data after insertion
    });
  }
  

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.Darkmode : styles.lightMode]}>
      <Card totalValue={totalAmountByMonth} />
      <View style={styles.btnArea}>
        <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>Expenses</Text>

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
        onSubmit={handleAddEntry}
        paymentMethodes={balances}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    flex: 1,
    position: 'relative',
    justifyContent:'center'
  },
  scrollContainer: {
    width:'100%',
    height:'100%'
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

},
lightMode:{
  backgroundColor:'#F3F3F3'
},
Darkmode:{
  backgroundColor:'#161616'
},
darkModeText:
  {
    color:'#1BCA8B',
  }
});

export default Home;
