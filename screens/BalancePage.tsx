import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import { Balance } from '../types';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CardBalance from '../components/UI/CardBalance';
import BalanceList from '../components/BalanceList';
import BalanceInsertion from '../components/BalanceInsertion'
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../Hooks/ThemeProvider ';


function BalancePage(){

  
  const [isOverlay, setIsOverlay] = useState(false);
  const { isDarkMode } = useTheme();
  const [balances, setBalances] = useState<Balance[]>([]);
  const db = useSQLiteContext();

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

function handleAddEntry(name: string, amount: number) {
  db.withTransactionAsync(async () => {
    await db.runAsync(
      `INSERT INTO balance (name, amount) VALUES (?, ?);`,
      [name, amount] 
    );

    

    await getData(); // Refresh data after insertion
  });
}



  return (
    <SafeAreaView style={[styles.container,isDarkMode ? styles.Darkmode : styles.lightMode]}>
      
      <View style={styles.btnArea}>
        <Text style={[styles.text,isDarkMode ? styles.darkModeText : styles.lightMode]}>Balances</Text>

        <TouchableOpacity style={styles.btn} onPress={() => setIsOverlay(true)}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.Scrollcontainer}>
          <BalanceList
              balances={balances} 
              deleteBalance={deleteBalance}      
          />
      </ScrollView>

      <BalanceInsertion
        visible={isOverlay}
        onClose={() => setIsOverlay(false)} // Close overlay when Cancel or Submit is pressed
        onSubmit={handleAddEntry}
      />
    </SafeAreaView>
  )
}

export default BalancePage

const styles = StyleSheet.create({
  container:{
    width: '100%',
    paddingVertical:10
  },
  Scrollcontainer:{
    height: '92%'
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
  backgroundColor:'#161616',
  borderColor:'#1BCA8B'
},
darkModeText:
{
  color:'#1BCA8B',
},
darkModeUnderLine:{
  borderBottomColor: '#1BCA8B'
}
})