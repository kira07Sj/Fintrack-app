import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground,ScrollView } from 'react-native';
import { useTheme } from '../Hooks/ThemeProvider ';


interface MenuOverlayProps {
  visible: boolean;
  onCloseHelp: () => void;
  
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ visible, onCloseHelp }) => {
 
    const { isDarkMode } = useTheme();
    const [isListed, setIsListed] = useState(false)
   
    function ListHandler(){
        setIsListed(true)
    }
    

  return (
    <Modal visible={visible} animationType="none" transparent onRequestClose={onCloseHelp}>
      <View style={styles.overlayContainer} >
        
        <View style={[styles.overlayContent, isDarkMode ? styles.Darkmode : styles.lightMode]}>
        <TouchableOpacity onPress={onCloseHelp}>
            <ImageBackground style={styles.closeBtn} source={require('../assets/back.png')} />
          </TouchableOpacity>
        
            <View>
                <Text style={styles.Text}>Help</Text>
            </View>

            <ScrollView style={styles.cont}>

                <TouchableOpacity onPress={ListHandler} style={[styles.HelpList, isDarkMode ? styles.helpListDark : styles.lightMode]}>
                    <View style={styles.ListHeader}>
                        <ImageBackground
                        source={require('../assets/dot.png')}
                        style={styles.dot}
                        ><Text style={styles.dotText}>1</Text>
                        </ImageBackground>

                        <Text style={styles.headerText}>Getting Started</Text>
                    </View>
                    <View style={[styles.inst, isListed ? styles.DisplayList : styles.DisplayNone]}>
                      <Text style={styles.instText}>How to Add Expenses:</Text>
                      <View style={styles.instContainer}><Text style={styles.instPar}>1. </Text><Text style={styles.instPar}>First make sure you have inserted
                      balance or wallet from Balance Screen </Text>
                      </View>
                      <View style={styles.instContainer}><Text style={styles.instPar}>2. </Text><Text style={styles.instPar}>Tap the "+" icon on the home screen.</Text>
                      </View>
                      <View style={styles.instContainer}><Text style={styles.instPar}>3. </Text><Text style={styles.instPar}>In the pop-up form, enter the name of the expense, the amount, and select a payment method. </Text>
                      </View>


                      <TouchableOpacity onPress={()=> setIsListed(false)} style={styles.arrowBtn}>
                    <ImageBackground
                        source={require('../assets/arrow_upward.png')}
                        style={styles.arrow}/>
                    </TouchableOpacity>
                      
                    </View>

                </TouchableOpacity>

            </ScrollView>
          
          
        </View>
        
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cont:{
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
  },
  overlayContent: {
    width: '90%',
    height: "100%",
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
    right: 90,
    marginBottom: 3,
    marginTop: 0
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700'
  },
  
  lightMode:{
    backgroundColor:'white'
  },
  Darkmode:{
    backgroundColor:'#161616'
  },
  helpListDark:{
    backgroundColor:'#1F1F1F'
  },
  helpListLight:{
    backgroundColor:'#F3F3F3'
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
  HelpList:{
    padding:10,
    width:'100%',
    borderWidth:1,
    borderColor:'#22D293',
    marginTop:5,
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    borderRadius:5,
    backgroundColor:'#000'
  },
  ListHeader:{
    display:'flex',
    flexDirection:'row',
    gap:6,
    alignItems:'center'
  },
  dot:{
    width:28,
    height:28,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  dotText:{
    color:'white',
    fontWeight:'bold'
  },
  headerText:{
    color:'#22D293',
    fontWeight:'bold',
    fontSize:16,
    marginLeft:20
  },
  inst:{
    marginLeft:10,
    display:'flex',
    flexDirection:'column',
    padding:5
  },
  instContainer:{
    display:'flex',
    flexDirection:'row',
    marginLeft:5,
    width:"90%"
  },
  instText:
  {
    color:'#22D293'
  },
  instPar:{
    color:"#22D293",
    opacity:.7,
  },
  DisplayList:{
    display:'flex'
  },
  DisplayNone:{
    display:'none'
  },
  arrow:{
    width:28,
    height:28,
  },
  arrowBtn:{
    position:'absolute',
    bottom:0,
    right:3
  }

});

export default MenuOverlay;
