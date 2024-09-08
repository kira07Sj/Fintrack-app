import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CheckBoxProps {
  onCheckChange?: (checked: boolean) => void;
}

export default function CheckBox({ onCheckChange }: CheckBoxProps) {
  const [checked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(!checked);
    if (onCheckChange) {
      onCheckChange(!checked);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.checkboxContainer}>
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
