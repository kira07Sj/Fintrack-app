import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>{isEnabled ? 'Dark Mode' : 'Light Mode'}</Text>
      <TouchableOpacity
        style={[styles.switch, isEnabled ? styles.switchEnabled : styles.switchDisabled]}
        onPress={toggleSwitch}
      >
        <View style={[styles.switchCircle, isEnabled ? styles.switchCircleEnabled : styles.switchCircleDisabled]} />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
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
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'#22D293',
    marginRight:30
  },
});

export default CustomSwitch;
