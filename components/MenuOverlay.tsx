import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Balance } from '../types';
import CustomSwitch from './UI/CustomeSwitch';

interface MenuOverlayProps {
  visible: boolean;
  onClose: () => void;
  

}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ visible, onClose }) => {
 

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlayContainer} >
        <View style={styles.overlayContent}>
          <TouchableOpacity onPress={onClose}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/back.png')} />
          </TouchableOpacity>

          <View>
            <CustomSwitch/>
          </View>
          
          
          
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    
  },
  overlayContent: {
    width: '70%',
    height: 600,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation:3,
    display: 'flex',
    alignItems: 'center',
    position:'absolute',
    right:1
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
    width: 35,
    height: 30,
    position: 'relative',
    marginRight: 200,
    marginBottom: 5,
    marginTop: -10
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700'
  },
  dropdown: {
    borderWidth: 1,
    width: '95%',
    height: 45,
    borderColor: 'gray',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center'
  }
});

export default MenuOverlay;
