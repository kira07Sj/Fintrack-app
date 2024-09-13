import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import Chart from '../components/UI/Chart';
import { useTheme } from '../Hooks/ThemeProvider ';
import { useFocusEffect } from '@react-navigation/native';



function Report() {
  const { isDarkMode } = useTheme();
  const [pieData, setPieData] = useState([]);
  const db = useSQLiteContext();
  const [totalExpenses, setTotalExpenses] = useState(0);


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
      const result = await db.getAllAsync ('SELECT name, SUM(amount) as totalAmount FROM expense GROUP BY name');
      
      const formattedData = result.map((expense, index) => ({
        label: expense.name,
        value: expense.totalAmount,
        color: getRandomColor(index), // Assign a color
      }));

      setPieData(formattedData);

      const totalResult = await db.getAllAsync('SELECT SUM(amount) as totalAmount FROM expense');
      const total = totalResult[0]?.totalAmount || 0;

      setTotalExpenses(total);

    } catch (error) {
      console.error('Error fetching expense data:', error);
    }
  };

  const getRandomColor = (index) => {
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
      <Text style={[styles.Text, isDarkMode ? styles.darkModeText: styles.lightMode]}>Report Summary</Text>
      <Text style={styles.innertext}>Total Expenses</Text>
      <Text style={styles.totalAmountText}>{totalExpenses}</Text>
      
      {pieData.length > 0 ? (
        <Chart data={pieData} radius={100} strokeWidth={2} />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
      </ScrollView>
    </View>
  );
}

export default Report;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer:{
    width:'100%',
    flex:1,
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
    marginLeft:10
  },
  noDataText: {
    color: '#127350',
    fontSize: 16,
  },
  darkModeText:
  {
    color:'#1BCA8B',
  },
  totalAmountText:{
    fontSize:28,
    position:'absolute',
    top:140,
    left:"41%",
    zIndex:30,
    fontWeight:'bold',
  },
  innertext:{
    
    position:'absolute',
    top:125,
    left:"36%",
    zIndex:30,
  },
 
});
