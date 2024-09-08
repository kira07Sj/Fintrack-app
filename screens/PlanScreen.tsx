import React from 'react'
import { View, Text,SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import InsertionOverlay from '../components/InsertionOverlay'
import { useEffect, useState,  } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { Balance, Plans } from '../types';
import { useFocusEffect } from '@react-navigation/native';
import CardPlan from '../components/UI/CardPlan';
import PlansList from '../components/PlansList';


function PlanScreen(){

  const [balances, setBalances] = useState<Balance[]>([]);
  const [plans, setPlans] = useState<Plans[]>([]);
  
  
  const db = useSQLiteContext();
  const [isOverlay, setIsOverlay] = useState(false);


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

    const balanceResult = await db.getAllAsync<Balance>(`SELECT * FROM balance`);
    setBalances(balanceResult);

    const plansResult = await db.getAllAsync<Plans>(`SELECT * FROM plans ORDER BY id DESC`);
    setPlans(plansResult);

  }

  async function deleteplan(id: number): Promise<void> {
    await db.runAsync(`DELETE FROM plans WHERE id = ?;`, [id]);
    await getData();
  }
  
  
  function handleAddEntry(name: string, amount: number, paymentMethodId: number) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `INSERT INTO plans (name, amount, balance_id) VALUES (?, ?, ?);`,
        [name, amount,paymentMethodId] // Include date in the insertion
      );

      await getData(); // Refresh data after insertion
    });
  }
  


  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.btnArea}>
        <Text style={styles.text}>Plans</Text>

        <TouchableOpacity style={styles.btn} onPress={() => setIsOverlay(true)}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.Scrollcontainer}>
          <PlansList
              plans={plans}
              balances={balances}
              deleteplan={deleteplan}
          />
      </ScrollView>

      <InsertionOverlay
        visible={isOverlay}
        onClose={() => setIsOverlay(false)} // Close overlay when Cancel or Submit is pressed
        onSubmit={handleAddEntry}
        paymentMethodes={balances}
      />
    </SafeAreaView>
  )
}

export default PlanScreen

const styles = StyleSheet.create({
  container:{
    width: '100%',
    marginVertical:10
  },
  Scrollcontainer:{
    height: '90%'
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
})