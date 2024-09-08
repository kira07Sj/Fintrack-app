import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function CustomCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity onPress={() => setChecked(!checked)} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checked]} />
      <Text style={styles.label}>{checked ? '' : ''}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#fff', // Set to white when checked
  },
  label: {
    fontSize: 16,
  },
});
