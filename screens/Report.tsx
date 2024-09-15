import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Chart from '../components/UI/Chart';
import { useTheme } from '../Hooks/ThemeProvider ';
import { useFocusEffect } from '@react-navigation/native';

// Define the type for the expense data
interface Expense {
  name: string;
  totalAmount: number;
}

// Define the type for the chart data
interface PieData {
  label: string;
  value: number;
  color: string;
}

function Report() {
  const { isDarkMode } = useTheme();
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const db = useSQLiteContext();

  useEffect(() => {
    fetchExpenseData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchExpenseData(); // Refresh data when the overlay screen is opened
    }, [])
  );

  const fetchExpenseData = async () => {
    try {
      // Get the result from the database and flatten it if necessary
      const result: Expense[] = (await db.getAllAsync<Expense[]>(
        `SELECT name, SUM(amount) as totalAmount FROM expense GROUP BY name`
      )).flat(); // Flatten the result if it returns nested arrays

      // Calculate the total expenses
      const total = result.reduce((sum, expense) => sum + (expense.totalAmount || 0), 0);
      setTotalExpenses(total); // Set the total expenses

      // Map the results to the chart data format
      const formattedData: PieData[] = result.map((expense, index: number) => ({
        label: expense.name,
        value: expense.totalAmount || 0,
        color: getRandomColor(index),
      }));

      setPieData(formattedData);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  const getRandomColor = (index: number) => {
    const colors = [
      '#ff6384', // Red
      '#36a2eb', // Blue
      '#ffcd56', // Yellow
      '#4bc0c0', // Teal
      '#f56954', // Orange
      '#9966ff', // Purple
      '#ff9f40', // Light Orange
      '#c9cbcf', // Gray
      '#2ecc71', // Green
      '#3498db', // Sky Blue
      '#9b59b6', // Violet
      '#e74c3c', // Bright Red
      '#f1c40f', // Bright Yellow
      '#34495e', // Navy Blue
      '#1abc9c', // Mint Green
      '#e67e22', // Pumpkin Orange
      '#ecf0f1', // Light Gray
      '#8e44ad', // Dark Violet
      '#d35400', // Dark Orange
      '#bdc3c7', // Silver
    ];
    return colors[index % colors.length];
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.Darkmode : styles.lightMode]}>
      
      
      <ScrollView style={styles.scrollContainer}>
      <Text style={styles.Text}>Report</Text>
      <View style={styles.textHolder}>
           <Text >Total Expenses</Text>
           <Text style={styles.totalText}>{totalExpenses.toFixed(2)}</Text>
      </View>
        {pieData.length > 0 ? (
          <Chart data={pieData} radius={100} strokeWidth={2} />
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  lightMode: {
    backgroundColor: 'white',
  },
  Darkmode: {
    backgroundColor: '#1F1F1F',
  },
  Text: {
    color: '#127350',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noDataText: {
    color: 'black',
    fontSize: 16,
  },
  totalText: {
    marginTop: 1,
    fontSize:26,
    fontWeight:'bold'
  },
  textHolder:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:125,
    zIndex:10,
    left:110
  }
});

export default Report;
