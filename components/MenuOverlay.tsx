import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Balance } from '../types';
import CustomSwitch from './UI/CustomeSwitch';
import { useTheme } from '../Hooks/ThemeProvider ';
import ResetOverlay from './ResetOverlay';


interface MenuOverlayProps {
  visible: boolean;
  onClose: () => void;
  
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ visible, onClose }) => {
 
    const { isDarkMode } = useTheme();
   
  const [isOverlay, setIsOverlay] = useState(false);

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
      <View style={styles.overlayContainer} >
        
        <View style={[styles.overlayContent, isDarkMode ? styles.Darkmode : styles.lightMode]}>
        <TouchableOpacity onPress={onClose}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/back.png')} />
          </TouchableOpacity>
        <View>
          <Text style={styles.Text}>Settings</Text>
        </View>

          <View>
            <CustomSwitch/>
          </View>

          <View style={styles.List}>
            <TouchableOpacity onPress={()=> setIsOverlay(true) }>
              <Text style={styles.label}>Reset Progress</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.List}>
            <TouchableOpacity>
              <Text style={styles.label}>Help</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.List}>
            <TouchableOpacity>
              <Text style={styles.label}>About Us</Text>
            </TouchableOpacity>
          </View>
          
          
          
        </View>
        <ResetOverlay
            visible={isOverlay}
            onClose={()=>setIsOverlay(false)}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayContent: {
    width: '70%',
    height: 300,
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
    right:1,
    marginTop:0
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
    width: 45,
    height: 30,
    position: 'absolute',
    right: 70,
    marginBottom: 3,
    marginTop: 0
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
  },
  lightMode:{
    backgroundColor:'white'
  },
  Darkmode:{
    backgroundColor:'#1F1F1F'
  },
  Text:{
    color:'#22D293',
    fontSize:20,
    fontWeight:'bold',
    marginBottom:15
  },
  label: {
    fontSize: 16,
    color:'#22D293',
    marginRight:'33%',
    
  },
  List:{
    paddingVertical:10,
    width:'110%',
    borderBottomWidth:1,
    borderBottomColor:'#22D293',
    paddingHorizontal:10,
    marginTop:5
  }
});

export default MenuOverlay;
