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
    const colors = ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#f56954'];
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
    flex:1
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
    top:'22%',
    left:"41%",
    zIndex:30,
    fontWeight:'bold',
  },
  innertext:{
    
    position:'absolute',
    top:'20%',
    left:"36%",
    zIndex:30,
  },
 
});
