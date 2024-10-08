import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../Hooks/ThemeProvider ';


const CustomSwitch = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dark Mode</Text>
      <TouchableOpacity 
        style={[styles.switch, isDarkMode ? styles.switchEnabled : styles.switchDisabled]} 
        onPress={toggleDarkMode}
      >
        <View style={[styles.switchCircle, isDarkMode ? styles.switchCircleEnabled : styles.switchCircleDisabled]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor:'#22D293',
    borderBottomWidth:1,
    paddingHorizontal:10,
    width:'100%'
  },
  switch: {
    width: 50,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 2,
  },
  switchEnabled: {
    backgroundColor: '#22D293',
    alignItems: 'flex-end',
  },
  switchDisabled: {
    backgroundColor: '#dcdde1',
    alignItems: 'flex-start',
  },
  switchCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  switchCircleEnabled: {
    // Add any extra styling for the enabled state if needed
  },
  switchCircleDisabled: {
    // Add any extra styling for the disabled state if needed
  },
  label: {
    fontSize: 16,
    color:'#22D293',
    marginRight:'33%',
  },
});

export default CustomSwitch;
