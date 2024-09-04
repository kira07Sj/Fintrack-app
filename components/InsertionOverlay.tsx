import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Balance } from '../types';

interface InsertionOverlayProps {
  visible: boolean;
  onClose: () => void;
//   onSubmit: (name: string, amount: number, paymentMethod: string) => void;
  paymentMethodes: Balance[];
}

function InsertionOverlay({ visible, onClose, paymentMethodes,  }: InsertionOverlayProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && name.trim() !== '' && paymentMethod) {
      
      setName('');
      setAmount('');
      setPaymentMethod(null);
      onClose();
    }
  };

    
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlayContainer} >
        <View style={styles.overlayContent}>
        <TouchableOpacity onPress={onClose}>
              <ImageBackground style={styles.closeBtn} source={require('../assets/close.png')}/>
            </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Expense Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        <View style={styles.dropdown}>
        <RNPickerSelect
              onValueChange={(value) => setPaymentMethod(value)}
              items={paymentMethodes.map((method) => ({
                label: method.name,
                value: method.name,
              }))}
              placeholder={{ label: 'Select payment method...', value: null }}
            />
        </View>

          
            <TouchableOpacity style={styles.btn}  onPress={handleSubmit}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

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
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '95%',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius:5
  },
  btn:{
    width:100,
    height:35,
    display: 'flex',
    backgroundColor: '#69FAD7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 5,
    elevation: 3
  },
  closeBtn:
  {
    width:24,
    height:24,
    position: 'relative',
    marginLeft: 200,
    marginBottom:5,
    marginTop:-10
    
  },
  btnText:
{
  fontSize: 15,
  fontWeight: '700'

},
dropdown:{
    borderWidth:1,
    width:'95%',
    height: 45,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius:5,
    display: 'flex',
    justifyContent:'center'
}
});

export default InsertionOverlay;


