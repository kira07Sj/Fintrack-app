import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Balance } from '../types';
import { useTheme } from '../Hooks/ThemeProvider ';
import CustomDropdown from './UI/CustomDropdown';

interface InsertionOverlayProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, amount: number, paymentMethodId: number, date: string) => void;
  paymentMethodes: Balance[];
}

const InsertionOverlay: React.FC<InsertionOverlayProps> = ({ visible, onClose, paymentMethodes, onSubmit }) => {
  const { isDarkMode } = useTheme();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<number | null>(null);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    const currentDate = new Date().toISOString().split('T')[0];
    if (!isNaN(numericAmount) && name.trim() !== '' && selectedPaymentMethodId !== null) {
      try {
        onSubmit(name, numericAmount, selectedPaymentMethodId, currentDate);
        setName('');
        setAmount('');
        setSelectedPaymentMethodId(null);
        onClose();
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('There was an error submitting the data. Please try again.');
      }
    } else {
      alert('Please enter a valid name, amount, and select a payment method.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlayContainer} onPress={onClose}>
        <View style={[styles.overlayContent, ]}>
          <TouchableOpacity onPress={onClose}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/close.png')} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, ]}
            placeholder="Expense Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, ]}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          
          {/* Replace RNPickerSelect with CustomDropdown */}
          <View style={styles.dropdown}>
            <CustomDropdown
              label="Select Payment Method"
              data={paymentMethodes.map((method) => ({
                label: method.name ,
                value: method.id,
              }))}
              onSelect={(value) => setSelectedPaymentMethodId(value)}
            />
          </View>
          
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: '80%',
    height: 290,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    alignItems: 'center',
    marginTop: -20
  },
  input: {
    width: '95%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  btn: {
    width: 100,
    height: 35,
    display: 'flex',
    backgroundColor: '#69FAD7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3
  },
  closeBtn: {
    width: 24,
    height: 24,
    position: 'relative',
    marginLeft: 200,
    marginBottom: 5,
    marginTop: -10
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700'
  },
  dropdown: {
    width: '95%',
    marginBottom: 15,
  },
  lightMode: {
    backgroundColor: 'white'
  },
  Darkmode: {
    backgroundColor: '#161616'
  },
  darkModeText: {
    color: '#1BCA8B',
    backgroundColor: '#1F1F1F'
  }
});

export default InsertionOverlay;
