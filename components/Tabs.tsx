import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home'; 
import Plans from '../screens/Plans';
import Balance from '../screens/Balance' ;
import Report from '../screens/Report';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#129E6C', // Set your desired background color here
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        headerShown: false, // Optional: Hides the header above the tab bar if not needed
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../assets/home-active.png')
                : require('../assets/home.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Plans"
        component={Plans}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../assets/plans-active.png')
                : require('../assets/plans.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Balance"
        component={Balance}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../assets/balance-active.png')
                : require('../assets/balance.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused
                ? require('../assets/report-active.png')
                : require('../assets/report.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
